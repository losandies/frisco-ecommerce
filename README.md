# Frisco Clothing Dept.

A full-stack streetwear store with a 50-product catalog, a persistent shopping bag, and account-based checkout.

**Built with:** React, Redux Toolkit, Tailwind CSS, Node.js, Express, Prisma, and PostgreSQL.

![Frisco storefront](docs/storefront.png)

## Features

- Responsive product browsing with category filters and price sorting
- Size selection and cart quantity controls
- Account registration and login with JWT authentication and bcrypt
- Saved shipping addresses and order history
- Server-calculated order totals
- Demo accounts for trying the shopping flow

Checkout simulates placing an order; no payments are collected.

## Run locally

Requires Node.js 22.12+ and Docker Compose, or a PostgreSQL database.

```sh
cp .env.example .env.local
```

Set a random `JWT_SECRET` in `.env.local`. If using your own PostgreSQL instance, update `DATABASE_URL` as well and skip the Docker command below.

```sh
npm run setup
docker compose up -d --wait
npm run db:migrate
npm run db:seed
npm run dev
```

Open **http://127.0.0.1:5173**. Choose **Try Demo Account** on the login page to try checkout and order history.

## Tests

```sh
npm test
npm run test:integration
npx playwright install chromium
npm run test:browser
```

Integration and browser tests require the database to be running and seeded. GitHub Actions runs the tests and production build.
