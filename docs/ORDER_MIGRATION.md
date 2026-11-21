# Spring Boot orders

## Behavior

- `POST /api/orders/placeOrder`: authenticated, CSRF-protected; returns 201.
- `GET /api/orders/allOrders`: authenticated; returns the owner's orders, newest first.
- `GET /api/users/getCurrentUser`: includes an `orders` array (empty when none exist).
- This is a demo checkout. No money is charged and no payment gateway is involved.
- Address saving remains a separate operation, matching Express. Orders do not yet snapshot shipping addresses.

## Request and response contract

```json
{"items":[{"id":1,"quantity":2,"size":"XL"}]}
```

Requests contain 1–100 non-null items. Each needs a non-null integer product ID,
an integer quantity from 1–99, and a nonblank string size of at most 20 characters.
Fractional IDs/quantities are rejected instead of truncated. Java standardizes sizes
as strings; React's numeric shoe sizes must be normalized during frontend integration.
The server reads prices and product descriptions from the catalog; submitted prices
and totals do not determine the charge. Missing products return 400 and no order is saved.
As in Express, repeated product lines and distinct sizes are retained rather than merged.

Responses retain `id`, `userId`, `items`, `total`, and `createdAt`. Item `id` means the
catalog product ID, not the internal order-item UUID. Item `price` is its purchased
unit price. Money is represented by JSON numbers in Java, whereas Express used
strings. Consumers must format amounts to two decimal places for display.

## Data and request flow

1. Spring Security validates the session and CSRF token.
2. Bean Validation checks `PlaceOrderRequest`, including every nested item.
3. `OrderService` resolves the owner using the authenticated email.
4. One catalog query loads the requested product IDs.
5. The service calculates subtotal from catalog unit prices and quantities.
6. Tax is 6% of subtotal, rounded HALF_UP to two decimal places; shipping is $5.00.
7. An order and its item snapshots are saved in one transaction.
8. DTOs are built before returning; JPA entities are never serialized as order responses.

Example: two $34.99 products yield subtotal $69.98, tax $4.20, shipping $5.00,
and total $79.18. The 6% rate preserves the existing demo rule, not real tax calculation.

`Order` owns a collection of item rows. Cascading saves persists those rows with the
order. Each `OrderItem` holds its order reference and copied product fields; its product
ID is not a foreign key. Changing or deleting the catalog product cannot rewrite history.
An explicit line position preserves input ordering. The history repository fetches items
with an entity graph to avoid one additional item query per order.

Current-user retrieval uses the already-loaded owner's ID to fetch the same history,
inside a read-only transaction. History is always scoped by that ID; clients do not
choose which user's history to read.

## Automated verification

From `backend-java/`, run:

```bash
./mvnw test
```

Order tests exercise real controllers, security filters, registration/login, JPA, and
an isolated H2 database. Tests roll back their data. The existing context smoke test
also uses H2, so running the suite does not update `frisco_dev` or the Express database.
H2 is not PostgreSQL: these tests do not replace a later PostgreSQL integration check.

Coverage includes catalog-based totals despite a submitted fake price, half-cent tax
rounding, repeated products and line ordering after reload, snapshots surviving catalog
changes/deletion, owner isolation, newest-first history, nested current-user orders,
invalid quantities/list entries/sizes, unavailable products, authentication, and CSRF.

## Manual verification

Restart the Java API to load the new mappings. With the existing development
`ddl-auto=update` setting, startup creates/updates the order tables in `frisco_dev`.
Existing Express data is not migrated or modified. Use the normal CSRF/login flow,
then fetch a fresh token after login because login clears the prior CSRF token.

With that session cookie and token saved using the mentorship curl examples:

```bash
curl -i -b /tmp/frisco-cookies.txt \
  http://localhost:8080/api/orders/placeOrder \
  -H 'Content-Type: application/json' \
  -H "X-CSRF-TOKEN: $(python3 -c 'import json; print(json.load(open("/tmp/frisco-csrf.json"))["token"])')" \
  -d '{"items":[{"id":1,"quantity":2,"size":"XL"}]}'

curl -sS -b /tmp/frisco-cookies.txt \
  http://localhost:8080/api/orders/allOrders | python3 -m json.tool
```

The POST creates a demo order. For the seeded $34.99 product at ID 1, expect total
79.18. Use an actual product ID from `GET /api/products` if the catalog differs.

React remains connected to Express. This change does not switch its API target.
Retries can create additional orders, as in the original app; idempotency is not
implemented in this migration increment.
