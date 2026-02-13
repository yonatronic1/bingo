# Legendary Growth Studio (Node + Express + React + PostgreSQL)

A complete starter project with:
- **Frontend:** React + Vite landing page and lead form
- **Backend:** Express API with validation and PostgreSQL persistence
- **Database tools:** PostgreSQL + pgAdmin 4 via Docker Compose

> This project helps you launch a polished offer funnel quickly. It cannot guarantee profits; results depend on your market, offer, and execution.

## 1) Prerequisites

- Node.js 20+
- Docker + Docker Compose

## 2) Start PostgreSQL + pgAdmin 4

```bash
docker compose up -d
```

### pgAdmin login
- URL: http://localhost:5050
- Email: `admin@legendary.local`
- Password: `admin123`

### Register server in pgAdmin
1. Right click **Servers** → **Register** → **Server**.
2. Name: `legendary-local`
3. Connection tab:
   - Host: `postgres`
   - Port: `5432`
   - Database: `legendary_growth`
   - Username: `postgres`
   - Password: `postgres`
4. Save.

## 3) Run backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend URL: http://localhost:4000

## 4) Run frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: http://localhost:5173

## 5) Test flow

1. Open frontend.
2. Submit lead form.
3. In pgAdmin, run:

```sql
SELECT * FROM leads ORDER BY created_at DESC;
```

## API quick reference

### `GET /health`
Returns server health.

### `POST /api/leads`
Creates or updates lead by email.

Sample payload:

```json
{
  "fullName": "Jane Founder",
  "email": "jane@example.com",
  "company": "Acme Labs",
  "monthlyBudget": 3000,
  "challenge": "Need a high-converting acquisition funnel"
}
```

### `GET /api/leads`
Returns latest 100 leads.


## Troubleshooting: Docker Desktop pipe error on Windows

If `docker compose up -d` fails with an error like:

```
unable to get image 'postgres:16' ...
open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified
```

Run this quick diagnostic:

```bash
./scripts/check-docker.sh
```

### Fix steps (Windows)
1. Start **Docker Desktop** and wait for **Engine running**.
2. Ensure Docker Desktop is using **Linux containers** (not Windows containers).
3. Verify daemon access:

```bash
docker info
```

4. Retry:

```bash
docker compose up -d
```

### If Docker is unavailable: local PostgreSQL fallback
You can still run this project without Docker:

1. Install PostgreSQL locally (v14+).
2. Create DB: `legendary_growth`.
3. Run schema SQL from `infra/init.sql` (psql, pgAdmin desktop, or another SQL client).
4. Configure `backend/.env` with local DB credentials.
5. Start backend/frontend normally.

Example (psql):

```bash
createdb -U postgres legendary_growth
psql -U postgres -d legendary_growth -f infra/init.sql
```

## Troubleshooting: confirm files are added to git

If you suspect files were not added, run:

```bash
./scripts/verify-project-files.sh
```

You can also inspect tracked files directly:

```bash
git ls-tree --name-only -r HEAD
```
