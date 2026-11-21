# Frisco Clothing Dept.

Frisco Clothing Dept. is a full-stack streetwear storefront. Browse the catalog, pick a size, and build a shopping bag. A demo account lets you save a shipping address, place a simulated order, and view your order history. Checkout records orders without collecting payment.

**[Try the live demo](https://dsf3uar9gd5k6.cloudfront.net/)**

![Frisco Clothing Dept. storefront screenshot](docs/storefront.png)

## How it works

- **Storefront** uses React, TypeScript, Vite, React Router, Tailwind CSS, and DaisyUI. RTK Query handles API calls, and Redux Persist keeps the shopping bag across reloads and sign-outs.
- **API** uses Java 21, Spring Boot, Spring Security, Bean Validation, and Spring Data JPA. Sign-in uses a server-side session with CSRF protection. The server calculates order totals using catalog prices and stores purchase-time product and price snapshots.
- **Hosting** uses CloudFront as the public entry point. It serves the frontend from private S3 and proxies `/api/*` to Nginx on EC2. Nginx forwards requests to the Spring Boot container, which connects to private RDS PostgreSQL.
- **Delivery** uses GitHub Actions for CI and ARM64 image publishing to ECR. The deployment workflow is manually triggered and uses Systems Manager to roll out a versioned image on EC2. The deploy script checks readiness and restores the previous image if the new one fails its checks.

The deployment workflow and production settings require AWS setup. The runbook covers setup, smoke checks, and the single-instance deployment tradeoffs. [Deployment runbook](docs/DEPLOYMENT.md)

## Run locally

Use Docker with Compose and Node.js 24, the version used in CI. Start the API and PostgreSQL from the repository root.

```sh
docker compose up --build -d
```

In a second terminal, start Vite with the Compose API as its proxy target.

```sh
cd client
npm ci
FRISCO_API_TARGET=http://127.0.0.1:8081 npm run dev
```

Open [http://127.0.0.1:5173](http://127.0.0.1:5173). The API seeds the product catalog when the database is empty. To enable the optional address map, set `VITE_GOOGLE_API_KEY` in `client/.env.local` using `client/.env.example` as a template.

Stop the containers with `docker compose down` from the repository root. The local PostgreSQL data persists in a named volume.

### Run the API directly

With Java 21 and a local PostgreSQL database, set `DB_URL` to a JDBC URL and set `DB_USERNAME` and `DB_PASSWORD` for that database.

```sh
cd backend-java
bash ./mvnw spring-boot:run
```

Vite proxies to `http://127.0.0.1:8080` by default, so start the client with `npm run dev` for this setup.

## Checks

Run each command from the repository root.

| Check | Command |
| --- | --- |
| Java build and tests | `(cd backend-java && bash ./mvnw -B verify)` |
| Frontend type check and build | `(cd client && npm ci && npm run typecheck && npm run build)` |
| Deployment script regression tests | `python3 -m unittest discover -s infra/ec2/tests -v` |
| Read-only live API smoke checks | `bash infra/ec2/smoke-test.sh` |

The Java integration tests use H2. The Docker setup runs PostgreSQL for local end-to-end testing.

## Repository layout

| Path | Contents |
| --- | --- |
| [`client/`](client/) | Storefront and account UI |
| [`backend-java/`](backend-java/) | Spring Boot API, tests, and Dockerfile |
| [`infra/terraform/`](infra/terraform/) | AWS infrastructure and GitHub OIDC roles |
| [`infra/ec2/`](infra/ec2/) | Deployment scripts, smoke checks, and host configuration templates |
| [`.github/workflows/`](.github/workflows/) | CI, image publishing, and deployment workflows |
| [`legacy/express/`](legacy/express/) | Original Express and Prisma implementation |

[Order API and migration notes](docs/ORDER_MIGRATION.md)
