# fsim — Football League Simulator (Next.js)

Monolith: UI + REST API under `/api/*`.

## Development

```powershell
npm install
cp .env.example .env.local   # then edit
npm run dev
```

## Database

SQLite file is created automatically on first API request (default: `data/fsm.db` in project root).

Set `SQLITE_PATH` in `.env.local` to use another location.

## Routes

| Path | Feature |
|------|---------|
| `/login` | Sign in / register |
| `/kluby` | Clubs |
| `/zawodnicy` | Players |
| `/ligi` | Leagues |
| `/pojedynek` | Friendly matches |
| `/sezony` | Seasons (draft) |
| `/ustawienia` | Settings |
