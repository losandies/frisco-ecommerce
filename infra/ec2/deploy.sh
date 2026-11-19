#!/usr/bin/env bash
# Run on EC2: sudo bash /opt/frisco/deploy.sh v2
# Requires an existing backend deployment and its protected environment file.
# Rollback restores the image, not database schema or data changes.

# Stop on unhandled command failures, unset variables, or failed pipeline stages.
set -euo pipefail

# $1 is the requested version. :? rejects an empty value; export passes it to Compose.
export IMAGE_TAG="${1:?Usage: deploy.sh IMAGE_TAG}"

# readonly prevents these deployment settings from being reassigned.
readonly AWS_REGION="us-east-1"
readonly ECR_REGISTRY="775893835482.dkr.ecr.us-east-1.amazonaws.com"
readonly COMPOSE_FILE="/opt/frisco/compose.yaml"

# A running container may still be starting or unable to reach the database.
# Retry the product endpoint; return 0 for success and 1 if readiness never succeeds.
wait_for_backend() {
    for attempt in {1..30}; do
        # Treat HTTP errors as failures, bound request time, and discard the JSON body.
        if curl --fail --silent --connect-timeout 2 --max-time 5 \
            http://127.0.0.1:8080/api/products \
            --output /dev/null; then
            return 0
        fi

        sleep 2
    done

    return 1
}

# Root access is needed for Docker and the root-only database environment file.
# EUID 0 means root; >&2 sends error messages to standard error.
if [[ "$EUID" -ne 0 ]]; then
    echo "Run this script with sudo on the EC2 instance." >&2
    exit 1
fi

# -f checks for a regular file; ! negates the check.
if [[ ! -f "$COMPOSE_FILE" ]]; then
    echo "Compose file not found: $COMPOSE_FILE" >&2
    exit 1
fi

# Validate without printing resolved configuration, which includes credentials.
docker compose -f "$COMPOSE_FILE" config --quiet

# $(...) captures command output. -q returns only the running container's ID.
previous_container_id="$(docker compose -f "$COMPOSE_FILE" ps -q backend)"

# -z checks for an empty value. Initial installation is a separate workflow.
if [[ -z "$previous_container_id" ]]; then
    echo "No running backend container found; stopping deployment." >&2
    exit 1
fi

# Record the current image before any update so failure has a rollback destination.
previous_image="$(docker inspect \
    --format '{{.Config.Image}}' \
    "$previous_container_id")"

# Rollback assumes an immutable tag from this repository, not a digest or local image.
# The unquoted * matches the tag suffix after the quoted repository prefix.
if [[ "$previous_image" != "$ECR_REGISTRY/frisco-backend:"* ]]; then
    echo "The running backend must use a tagged image from the Frisco ECR repository." >&2
    exit 1
fi

# ##*: removes the longest prefix ending in a colon, leaving the image tag.
previous_tag="${previous_image##*:}"

echo "Current image: $previous_image"
echo "Requested version: $IMAGE_TAG"

# Use EC2's IAM role to obtain a temporary ECR credential; never print it.
aws ecr get-login-password --region "$AWS_REGION" |
    docker login --username AWS --password-stdin "$ECR_REGISTRY"

# Download first. Authentication or pull failures leave the current container alone.
docker compose -f "$COMPOSE_FILE" pull backend

echo "Starting backend version $IMAGE_TAG..."

# Use the downloaded image without compiling or pulling again.
# && checks readiness only if Compose succeeds; the if handles either failure below.
if docker compose -f "$COMPOSE_FILE" up -d --no-build --pull never backend \
    && wait_for_backend; then
    echo "Deployment succeeded: $IMAGE_TAG"
    exit 0
fi

echo "Deployment failed. Restoring $previous_image..." >&2

# Override IMAGE_TAG only for this command and restore the previous local image.
if IMAGE_TAG="$previous_tag" \
    docker compose -f "$COMPOSE_FILE" up -d --no-build --pull never backend \
    && wait_for_backend; then
    echo "Previous version restored successfully." >&2
else
    echo "Rollback failed. Inspect the backend container logs." >&2
fi

# A restored service does not make the requested deployment successful.
exit 1
