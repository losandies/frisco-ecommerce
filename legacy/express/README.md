# Legacy Express backend

The original Node.js, Express, Prisma, and PostgreSQL implementation is retained
here for reference. The active application uses `backend-java/` and `client/`.
This directory is not part of the current deployment.

## Running the archived API

From this directory:

```sh
npm ci
cp .env.example .env.local
# Configure DATABASE_URL and JWT_SECRET in .env.local.
npm run db:generate
npm run server
```

Use a separate legacy database. Schema-changing and seeding commands are manual;
do not point them at the Spring Boot database or an existing production database.
Existing root-level local environment files were deliberately not moved.

The historical database container configuration is in `compose.yaml`.
The shared frontend remains at `../../client`, but it now targets Spring Boot.
Running the legacy API does not reconnect the frontend to it.

## Tests and historical tooling

`npm test` runs the legacy Node tests. Integration tests require the legacy
database. The browser test and `playwright.config.js` describe the old JWT-based
frontend and need migration before they can validate the current application.
`ci/ci.yml` preserves the old workflow as reference; it is no longer an active
GitHub Actions workflow. New CI for Spring Boot and TypeScript is still needed.

`README.original.md` preserves the previous project description.
