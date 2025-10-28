# Monolith Backend & Frontend

## Overview

This project provides:
- **Backend**: Node.js/Express REST API for Users (PostgreSQL)
- **Frontend**: React + TypeScript Admin UI (with Tailwind CSS)

---

## Backend (API)
- **Path**: `/src` and `server.js`
- **Stack**: Express, PostgreSQL (`pg`), dotenv
- **Features**:
  - List users
  - Create, update, delete user

### Setup
1. Install dependencies:
```bash
npm install
```
2. Set up `.env` with PostgreSQL settings (see sample below)
3. Start server:
```bash
npm run dev
```

#### .env example
```
PORT=7001
DB_USER=your_pg_user
DB_HOST=localhost
DB_NAME=your_db
DB_PASS=your_db_pass
DB_PORT=5432
```

- API runs on http://localhost:7001
- Make sure your `users` table exists! Example:
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(200) NOT NULL
);
```

### API Endpoints
- `GET /api/users/getUsers` – list all users
- `POST /api/users/addUsers` – create user (json: { name, email })
- `PUT /api/users/:userId` – update user (json: { name?, email? })
- `DELETE /api/users/:userId` – delete user

---

## Frontend (Admin UI)
- **Path**: `/frontend`
- **Stack**: React, TypeScript, Vite, Tailwind CSS
- **Features**:
  - List users
  - Create, update, delete user (with inline form)
  - Nice UI, dark mode toggle

### Setup
1. Go to frontend and install deps:
```bash
cd frontend
npm install
```
2. Start the app:
```bash
npm run dev
```
- Open http://localhost:5173
- The UI proxies API calls to `localhost:7001` automatically

### Development Notes
- UI and API are independent; run both in parallel
- Edit styles in `frontend/src/App.css`, or enhance UI using Tailwind
- For production, consider CORS and environment variable management

---

## Author
- Built with ❤️ by your team.
