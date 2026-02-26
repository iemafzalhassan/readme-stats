# AGENTS.md

## Cursor Cloud specific instructions

### Overview

GitHub Readme Stats — a Node.js service that dynamically generates SVG stat cards for GitHub README profiles. Single application (not a monorepo), deployed as Vercel serverless functions or locally via Express.js.

### Running the application

- **Dev server:** `npm run dev` starts Express.js on port 4700 (serves both API routes under `/api/*` and the static Profile Wizard frontend).
- The `.env` file should contain `NODE_ENV=development` to disable caching locally.
- GitHub-related API endpoints (`/api`, `/api/pin`, `/api/top-langs`, `/api/gist`, `/api/streak`) require a `PAT_1` environment variable (GitHub Personal Access Token). Without it, those endpoints return errors — this is expected.
- The `/api/quotes` endpoint works without any tokens (uses external API with built-in fallback quotes).
- The `/api/themes` endpoint returns available themes as JSON and requires no tokens.

### Lint, Test, Format

Standard commands from `package.json`:

- **Lint:** `npm run lint` (ESLint with zero warnings policy)
- **Test:** `npm test` (Jest with `--experimental-vm-modules`; all HTTP calls are mocked, no external services or tokens needed)
- **Format check:** `npm run format:check` (Prettier)
- **Format fix:** `npm run format`

### Pre-commit hooks

Husky is configured. The pre-commit hook runs `npm test`, `npm run lint`, and `npx lint-staged` (Prettier on staged `*.{js,css,md}` files).

### Known issues

- One test in `tests/calculateRank.test.js` has a pre-existing floating-point precision failure (expected `65.02918514848257` vs actual `65.02918514848255`). This is not caused by environment setup.
- Two files (`frontend/index.html`, `src/cards/stats.js`) have pre-existing Prettier formatting issues.
