# Resume and interview material

## Project entry

**Frisco Clothing Dept. — Full-Stack E-commerce Demo**  
React · Redux Toolkit · Node.js · Express · Prisma · PostgreSQL · Tailwind CSS · Playwright

- Built a responsive e-commerce application featuring a 50-product catalog, size-specific shopping cart, account authentication, saved addresses, and order history.
- Implemented JWT-protected APIs and bcrypt password hashing, with server-calculated checkout totals and account-scoped order access.
- Added repeatable database migrations and seeding, API integration tests, and Playwright coverage for browsing, checkout failure recovery, and order persistence.

Use two or three bullets based on the role. Add your repository link and a live demo URL only after it is deployed. Do not claim revenue, real payment processing, customer volume, or performance improvements without measurements.

## Suggested walkthrough

1. **Problem:** Build a complete shopping flow that demonstrates frontend state management and backend persistence.
2. **Demo:** Browse a product, choose a size, add it to the cart, try a demo account, place a simulated order, and show the order in account history.
3. **Architecture:** Explain the React/Redux client, Express API, Prisma models, and PostgreSQL relations.
4. **Correctness:** Show why the API reads prices from the database and obtains order ownership from the verified token. Describe how a failed checkout preserves the shopping cart.
5. **Validation:** Walk through the API test for tampered totals and another user's order access, then the browser test for checkout recovery.
6. **Tradeoffs:** Discuss simulated payment, local-storage JWTs, string money fields, and the next steps for payments, inventory, and production sessions.

## Before applying

- Publish the updated repository after reviewing the diff and environment-file exclusions.
- Review the screenshots in the README and replace them if you change the UI.
- If you deploy a live demo, use a separate database and secret, restrict optional Maps keys to your domain, and keep the demo-payment explanation visible.
- Run the documented checks and verify the hosted flow from a fresh browser session.
