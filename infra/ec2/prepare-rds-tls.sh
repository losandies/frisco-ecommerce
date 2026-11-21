#!/usr/bin/env bash
# Run on EC2 before using the hardened deployment Compose file.
set -euo pipefail

if [[ "$EUID" -ne 0 ]]; then
    echo "Run with sudo on EC2." >&2
    exit 1
fi

bundle="$(mktemp)"
trap 'rm -f "$bundle"' EXIT

# Public CA certificates, not credentials. Use the regional AWS trust store.
curl --fail --silent --show-error --location --connect-timeout 10 --max-time 60 \
    https://truststore.pki.rds.amazonaws.com/us-east-1/us-east-1-bundle.pem \
    --output "$bundle"
openssl crl2pkcs7 -nocrl -certfile "$bundle" |
    openssl pkcs7 -print_certs -noout >/dev/null

install -d -m 755 /etc/frisco/certs
install -m 644 "$bundle" /etc/frisco/certs/rds-ca-bundle.pem
echo "Installed the RDS CA bundle. Set DB_URL to verify-full before deploying."
