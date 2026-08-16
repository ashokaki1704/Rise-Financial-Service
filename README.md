# Rise Financial Services — Node.js + React

Full rebuild of the site on a **Node.js/Express backend** and a **React
(Vite) frontend**, replacing the earlier Python/Flask + static HTML version.
Same look, same form, same database behaviour — different stack.

## Project structure

```
rise-node/
├── server/              Express API + SQLite database
│   ├── server.js         All routes (/api/health, /api/apply, /api/submissions, /api/export-excel)
│   ├── db.js              SQLite connection layer (better-sqlite3)
│   ├── package.json
│   └── .env.example
├── client/              React frontend (built with Vite)
│   ├── src/
│   │   ├── components/    Header, Hero, Why, Services, Process, Network, Apply, Footer
│   │   ├── App.jsx
│   │   ├── data.js         Content for hero slides, services, etc.
│   │   └── index.css       All site styling (same design as before)
│   └── public/assets/     Logo + slider images
├── package.json          Root scripts to build/run both together
├── render.yaml           One-click Render.com deploy config
└── Procfile
```

## Run it locally

You need **Node.js 22.5 or newer** installed (check with `node --version`).
The database layer uses `node:sqlite`, which is built directly into Node —
no native compilation, no Visual Studio / build tools needed on Windows.
You may see a one-line `ExperimentalWarning: SQLite is an experimental
feature` in the console on startup; that's expected and harmless.

**1. Install everything and build the frontend:**
```bash
npm run build
```
This installs both `server` and `client` dependencies and builds the React
app into `client/dist`.

**2. Start the server** (serves the built React app + the API, all on one port):
```bash
npm start
```

**3. Open your browser:**
```
http://localhost:8000
```

### Developing with hot-reload (optional)
Run these in two terminals instead of step 2:
```bash
npm run dev:server   # Express API on :8000
npm run dev:client   # Vite dev server on :5173 (proxies /api to :8000)
```
Then browse to `http://localhost:5173`.

## Confirming it works

- `http://localhost:8000/api/health` → `{"success":true,"database":"sqlite","status":"connected"}`
- `http://localhost:8000/api/submissions` → JSON list of every form submission
- `http://localhost:8000/api/export-excel` → downloads a fresh `.xlsx` of all submissions
- Submitting the "Apply Now" form on the site inserts a row into
  `server/data/applications.db` (auto-created on first run)

## Deploying (Render.com, free tier)

1. Push this whole `rise-node` folder to a GitHub repo (as the repo root).
2. On [render.com](https://render.com), click **New → Web Service**, connect
   the repo. Render auto-detects `render.yaml`.
3. Build command: `npm run build`. Start command: `npm start`. (Already set
   in `render.yaml`.)
4. Deploy, then check `https://your-app.onrender.com/api/health`.

**Important — data persistence:** Render's free plan wipes the filesystem on
every restart/redeploy, so `server/data/applications.db` won't survive.
For real customer data, either add a paid persistent disk mounted at
`./server/data`, or swap `server/db.js` for a managed Postgres client
(Render offers a free Postgres add-on).

## Notes

- All images live in `client/public/assets/` and are copied into
  `client/dist/assets/` automatically when you build — no manual copying
  needed.
- The mobile number, loan type, and required-field validation match the
  original site exactly.
- No data leaves your server; everything is stored in your own SQLite file
  (or your own Postgres/MySQL instance if you switch).
