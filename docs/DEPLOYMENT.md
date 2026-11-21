# Deployment runbook

The storefront is deployed, but this runbook distinguishes the working baseline
from the final configuration changes that still require an operator to apply them.
No command below should be run against a different AWS account or database.

## Architecture and boundaries

- Region: `us-east-1`; public site: https://dsf3uar9gd5k6.cloudfront.net.
- CloudFront serves private S3 assets and forwards `/api/*` to the EC2 origin.
- `frisco-shop.duckdns.org` is the **backend origin**, not the storefront URL.
- CloudFront uses HTTPS and adds `X-Frisco-Origin`; Nginx verifies that secret.
- Nginx forwards to Docker's loopback-only port `127.0.0.1:8080`.
- The container uses a separate `frisco_app` login for private RDS PostgreSQL.
- A single small EC2 instance keeps the architecture affordable. Updates have a
  brief interruption; replacing Java clears in-memory login sessions.
- The $30 monthly budget is an alerting target, **not a spending cap**. Check actual
  billing; EC2/RDS run continuously, with additional storage, IPv4, ECR, and traffic costs.

## One-time finish checklist

Do these in order. The Compose and deployment script now require the CA file and
verified database URL; install those prerequisites **before** replacing either file
on EC2. Do not deploy a new image with missing configuration.

### 1. Move Terraform state into private versioned S3

Run on the Mac, from the repository root. Keep a secure backup of the existing
`infra/terraform/terraform.tfstate` before migrating; it contains credentials.
Do not print, commit, or paste state files or Terraform plan JSON.

```sh
terraform -chdir=infra/state-bootstrap init
terraform -chdir=infra/state-bootstrap plan
terraform -chdir=infra/state-bootstrap apply
```

This creates **only** the state bucket and its versioning, encryption, public-access
block, and HTTPS-only bucket policy. It does not replace existing infrastructure.
Review the plan before confirming. The bucket has deletion prevention enabled.

```sh
FRISCO_STATE_BUCKET="$(terraform -chdir=infra/state-bootstrap output -raw bucket_name)"
cp infra/terraform/backend.tf.example infra/terraform/backend.tf
terraform -chdir=infra/terraform init -migrate-state -backend-config="bucket=$FRISCO_STATE_BUCKET"
```

Accept the state-copy prompt, then verify `terraform -chdir=infra/terraform state list`
still contains the existing EC2, RDS, and CloudFront resources. S3 native locking
uses a `.tflock` object; only the operator needs state access. GitHub's publishing
and deployment roles intentionally receive **no Terraform/state permissions**.
Keep the bootstrap root's own local state backed up securely; migrating that small
root is a separate optional step. Never delete a state bucket during app cleanup.

### 2. Create the scoped GitHub OIDC roles and deployment document

Before applying, check **IAM → Identity providers** for
`token.actions.githubusercontent.com`. If it already exists, supply its ARN through
the `github_oidc_provider_arn` Terraform variable; do not create a duplicate.
`github_repository` must match the exact GitHub owner/repository.

```sh
terraform -chdir=infra/terraform plan
terraform -chdir=infra/terraform apply
```

Use the saved **RDS administrator** password for `db_password` and the existing
Nginx/CloudFront secret for `origin_secret`. These are not the application password
or DuckDNS token. Do not accept EC2/RDS replacements or unplanned password changes.
The intended additions are the OIDC provider (unless reused), two roles, two role
policies, and one fixed SSM document. Existing running resources should be unchanged.

Get the configuration values:

```sh
terraform -chdir=infra/terraform output github_publish_role_arn
terraform -chdir=infra/terraform output github_deploy_role_arn
terraform -chdir=infra/terraform output backend_instance_id
terraform -chdir=infra/terraform output backend_deploy_document
```

In GitHub **Settings → Secrets and variables → Actions → Variables**, add:

| Variable | Terraform output |
| --- | --- |
| `FRISCO_PUBLISH_ROLE_ARN` | `github_publish_role_arn` |
| `FRISCO_DEPLOY_ROLE_ARN` | `github_deploy_role_arn` |
| `FRISCO_INSTANCE_ID` | `backend_instance_id` |
| `FRISCO_DEPLOY_DOCUMENT` | `backend_deploy_document` |

These identifiers are not secrets. Do not add AWS access keys or database passwords
to GitHub. OIDC issues temporary credentials. Publishing trusts only `master`;
deployment trusts this repository's `production` environment.

Create **Settings → Environments → production** and restrict deployment branches
to **only `master`**. This restriction is important because environment-based OIDC
subjects identify the environment, not the branch. Add a required reviewer if the
repository plan supports it. A manual workflow trigger is still required either way.
Keep GitHub's default OIDC subject format; a customized organization subject needs
a corresponding trust-policy change.

Under **Settings → Rules → Rulesets**, protect `master`: require PRs and the passing
checks `Backend tests`, `Frontend checks`, and `Deployment script checks`. Do not
require a second person's approval if that would block this solo project.

### 3. Prepare EC2 for the production configuration

Use Session Manager in `us-east-1`. Do not open SSH or PostgreSQL publicly.
Copy the committed `infra/ec2/prepare-rds-tls.sh` to
`/opt/frisco/prepare-rds-tls.sh` on EC2, then run:

```sh
sudo bash /opt/frisco/prepare-rds-tls.sh
sudo nano /etc/frisco/backend.env
```

Keep the existing application credentials, but change the URL to:

```dotenv
DB_URL='jdbc:postgresql://YOUR_ACTUAL_RDS_HOSTNAME:5432/frisco?sslmode=verify-full&sslrootcert=/etc/frisco/certs/rds-ca-bundle.pem'
```

The CA bundle is public, mode `644`, and mounted read-only into the container.
The environment file remains root-owned, mode `600`. Do not use `frisco_admin`
as the application login or print the environment file. `verify-full` checks both
the certificate chain and the RDS hostname; do not use an IP address in this URL.

Copy the committed `compose.ec2.yaml` to `/opt/frisco/compose.yaml` and the updated
`infra/ec2/deploy.sh` to `/opt/frisco/deploy.sh`. No secrets are in either file.
Validate without displaying resolved credentials:

```sh
sudo env IMAGE_TAG=v1 docker compose -f /opt/frisco/compose.yaml config --quiet
sudo bash /opt/frisco/deploy.sh v1
```

This verifies the stricter TLS connection using the known existing version before
introducing the next image. The Compose environment also explicitly secures cookies
and validates the schema, including when rolling back to older images.
The new image adds the `prod` profile with equivalent settings and a 30-minute
session timeout. Local development retains `ddl-auto=update`; production uses
`validate` and will **not** create or alter missing tables automatically.

The current RDS schema was provisioned during initial deployment. A fresh database
requires an explicit schema provisioning step; database migrations are not yet
implemented. Do not turn on schema updates during every deployment. Seven-day RDS
backups are configured, but restore procedures have not been exercised.

Ensure the SSM agent supports environment-variable parameter interpolation (agent
3.3.2746.0 or newer). Update Amazon Linux's `amazon-ssm-agent` package if required.
The custom SSM document passes `ImageTag` through `SSM_ImageTag`, not shell interpolation.

### 4. Merge, publish, and deploy

Review the final PR and merge only after CI passes. On `master`, backend changes
trigger **Publish backend image**, or run it manually from **Actions**. The image
build runs Maven tests and publishes **Arm64** to match `t4g.micro`.

Tags use `sha-<full commit SHA>`; the workflow summary records the exact version.
ECR tags are immutable. Re-publishing an existing SHA tag can fail rather than
overwriting a release; deploy the already-published tag instead. A new commit
produces a new tag. Publishing an image never deploys it automatically.

Run **Actions → Deploy backend → Run workflow**, select `master`, and enter the
existing image tag. The protected environment gates the job. GitHub checks the
image exists, invokes only the `frisco-deploy-backend` document on this EC2 instance,
and waits for the deployment result. The installed script handles readiness and
rollback. Repository configuration files are not silently replaced by this job;
install reviewed host configuration changes separately.

Manual equivalent on EC2:

```sh
sudo bash /opt/frisco/deploy.sh sha-YOUR_FULL_COMMIT_SHA
```

Never run two deployments concurrently. GitHub serializes its deployment jobs;
avoid a manual deployment while a workflow is active. If the workflow times out,
inspect the reported SSM command before retrying: it may still be running.

## Verification and recovery

From the Mac, run the read-only public checks (curl verifies HTTPS certificates):

```sh
bash infra/ec2/smoke-test.sh
```

They check products, anonymous account rejection, CSRF fields, and `Secure`,
`HttpOnly`, `SameSite=Lax` session cookies. Then test register/login, saved address,
demo checkout/history, and logout in a browser. Logout must preserve the cart.
No real payment is charged. Current user and order responses must never be cached.

To deliberately roll back, run the deployment workflow with the previous immutable
tag, or invoke `deploy.sh` on EC2 with that tag. A failed deployment exits with
failure even if automatic rollback restores service. It restores the image only;
it cannot reverse incompatible schema/data changes.

Automatic failure/rollback behavior has mocked regression coverage. A deliberately
unhealthy image has **not** been deployed against the live site. Test that during
a planned demo maintenance window, rather than claiming live failover is proven.

For diagnosis, on EC2 substitute the tag actually running:

```sh
sudo docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}'
sudo env IMAGE_TAG=v1 docker compose -f /opt/frisco/compose.yaml logs --tail=100 backend
sudo docker stats --no-stream
df -h /
sudo systemctl status nginx --no-pager
sudo systemctl list-timers frisco-cert-renew.timer --no-pager
sudo journalctl -u frisco-cert-renew.service -n 30 --no-pager
```

Check memory, disk space, renewal failures, RDS storage/CPU, and AWS actual spend.
Do not prune images needed for rollback or delete database volumes as troubleshooting.
Container logs are rotated; centralized logging/alerts are a follow-up, not configured.
RDS T4g uses unlimited CPU credits, so sustained load can add charges; this is a
low-traffic portfolio environment, not a load-test target.

## Rebuilding an EC2 host

Terraform recreates network, IAM, compute, database configuration, and CloudFront;
it does not currently install guest software or restore host secrets. On replacement:

1. Install Docker, Nginx, Python 3, curl, OpenSSL, and the Arm64 Compose plugin.
   Enable Docker and Nginx; keep SSH closed and use Session Manager.
2. Restore `/etc/frisco/backend.env` from the password manager, not Git or an image.
3. Install the RDS CA bundle using `prepare-rds-tls.sh`.
4. Point DuckDNS at the new EC2 public IP. Automatic public IPs can change on stop/start.
   DNS updates are currently manual; Terraform does not manage DuckDNS.
5. Install acme.sh in `/opt/acme.sh`, configuration in `/etc/acme.sh` (root-only),
   and issue an ECC Let's Encrypt certificate with the DuckDNS DNS API. Read the
   token with a hidden prompt; never put it in shell history or Git.
6. Install the key to `/etc/nginx/ssl/frisco.key` and full chain to
   `/etc/nginx/ssl/frisco-fullchain.pem`. Record the acme.sh reload command
   `/usr/sbin/nginx -t && /usr/bin/systemctl reload nginx`.
7. Render `infra/ec2/nginx/frisco.conf.template`, replacing only `__ORIGIN_SECRET__`
   with the saved CloudFront secret, into `/etc/nginx/conf.d/frisco.conf` mode `600`.
   Do not run unrestricted `envsubst`: it would erase Nginx's own `$host` variables.
   Run `sudo nginx -t` before reloading. Never commit the rendered file or keys.
8. Install both renewal units from `infra/ec2/systemd/`, reload systemd, and enable
   `frisco-cert-renew.timer`. Test the oneshot service and inspect its next run.
9. Copy the deployment Compose file/script to `/opt/frisco/`. Authenticate Docker
   to ECR using the instance role, pull a known version, and perform the **initial**
   `docker compose up -d` with `IMAGE_TAG` set. The update script intentionally
   refuses initial installation when no running backend container exists.
10. Verify products locally and through CloudFront. Recreate GitHub's instance-ID
    variable from the Terraform output if the instance changed.

No Java installation on the host or legacy `frisco.service` is needed with Docker.
The old JAR bucket/IAM permission remain as migration artifacts; remove them in a
separate reviewed cleanup only after rollback references are no longer needed.

## Completion boundary

This is a deployed, reproducible-in-code portfolio application with manual host
bootstrap, not a highly available production commerce service. Remaining follow-ups:
versioned DB migrations and least-privilege runtime schema permissions, tested RDS
restore, fully automated guest bootstrap/secrets delivery, stable DNS on host
replacement, live automatic-rollback testing, image vulnerability scanning, and
centralized health alerts. No payment processing or real customer data is intended.

References: [GitHub OIDC with AWS](https://docs.github.com/en/actions/how-tos/secure-your-work/security-harden-deployments/oidc-in-aws),
[Terraform S3 locking](https://developer.hashicorp.com/terraform/language/backend/s3),
[RDS PostgreSQL TLS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/PostgreSQL.Concepts.General.SSL.html),
[SSM parameter interpolation](https://docs.aws.amazon.com/systems-manager/latest/userguide/documents-schemas-features.html).
