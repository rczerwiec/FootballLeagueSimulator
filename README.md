# Football League Simulator (FSM)

Create and simulate your own football league.

## Run the application

```powershell
cd fsim
npm install
# Copy .env.example to .env.local and fill Firebase + optional SQLITE_PATH
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 16** (App Router) — frontend + API in one project
- **SQLite** (local file, default `./data/fsm.db`) — Drizzle ORM + better-sqlite3
- **Firebase Auth** — client login; Admin SDK verifies API tokens

## Legacy code

The original split Express + CRA apps are kept for reference only:

- [legacy/f-app-backend](legacy/f-app-backend) — old Node/Express/MongoDB API
- [legacy/f-app-frontend](legacy/f-app-frontend) — old React CRA client

Do not use them for new development.

## Environment

See [fsim/.env.example](fsim/.env.example):

- `SQLITE_PATH` — path to SQLite database file (optional)
- `GOOGLE_APPLICATION_CREDENTIALS` — Firebase Admin service account JSON
- `NEXT_PUBLIC_FIREBASE_*` — Firebase web client config
