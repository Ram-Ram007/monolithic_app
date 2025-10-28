# Monolith Frontend (React + TypeScript)

## Setup

1. Install deps
```bash
cd frontend
npm install
```

2. Run dev server (proxies /api to backend on 7001)
```bash
npm run dev
```

Backend should be running on port 7001. Vite runs on 5173.

## API
- GET `/api/users/getUsers`
- POST `/api/users/addUsers` (body: `{ name, email }`)
- PUT `/api/users/:userId` (body: `{ name?, email? }`)
- DELETE `/api/users/:userId`
