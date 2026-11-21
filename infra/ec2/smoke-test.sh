#!/usr/bin/env bash
# Read-only public checks. No account is created and no order is placed.
set -euo pipefail
base_url="${1:-https://dsf3uar9gd5k6.cloudfront.net}"
base_url="${base_url%/}"
scratch="$(mktemp -d)"
trap 'rm -rf "$scratch"' EXIT

fetch() {
    curl --silent --show-error --connect-timeout 5 --max-time 30 \
        "$base_url$1" --output "$scratch/body.json" --write-out '%{http_code}'
}

code="$(fetch /api/products)" || exit 1
if [[ "$code" != "200" ]]; then
    echo "FAIL: product endpoint returned HTTP $code" >&2
    exit 1
fi
python3 - "$scratch/body.json" <<'PY'
import json, sys
with open(sys.argv[1]) as source:
    products = json.load(source)
assert isinstance(products, list) and products, "Expected a nonempty product catalog"
assert isinstance(products[0]["price"], (int, float)), "Product prices must be JSON numbers"
PY
echo "PASS: product catalog over verified HTTPS"

code="$(fetch /api/users/getCurrentUser)" || exit 1
if [[ "$code" != "401" ]]; then
    echo "FAIL: anonymous account request returned HTTP $code, expected 401" >&2
    exit 1
fi
echo "PASS: anonymous account access denied"

code="$(curl --silent --show-error --connect-timeout 5 --max-time 30 \
    "$base_url/api/csrf" --dump-header "$scratch/headers" \
    --output "$scratch/csrf.json" --write-out '%{http_code}')"
if [[ "$code" != "200" ]]; then
    echo "FAIL: CSRF endpoint returned HTTP $code" >&2
    exit 1
fi
python3 - "$scratch/csrf.json" "$scratch/headers" <<'PY'
import json, sys
with open(sys.argv[1]) as source:
    csrf = json.load(source)
assert all(csrf.get(key) for key in ("token", "headerName", "parameterName")), "Missing CSRF fields"
with open(sys.argv[2]) as source:
    cookies = [line.lower() for line in source if line.lower().startswith("set-cookie: jsessionid=")]
assert cookies, "CSRF request should create a session"
assert any(all(flag in cookie for flag in ("; secure", "; httponly", "samesite=lax"))
           for cookie in cookies), "Session cookie must be Secure, HttpOnly, and SameSite=Lax"
PY
echo "PASS: CSRF endpoint and secure session-cookie attributes"
echo "Read-only smoke checks passed. Test authenticated browser flows separately."
