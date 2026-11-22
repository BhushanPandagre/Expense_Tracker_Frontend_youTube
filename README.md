# Expense Tracker: Frontend (React + Vite)

Video 4 ka code. Ye Video 2/3 wali `expense-api` (Node + Express + MongoDB) se baat karta hai.

## Chalana
```bash
npm install
cp .env.example .env     # VITE_API_URL=http://localhost:5000/api
npm run dev              # http://localhost:5173
```

## Backend me ek badlav (zaroori)
Backend ki `.env` me CORS ke liye frontend ka address badlo, kyunki Vite 5173 pe chalta hai:
```
CLIENT_URL=http://localhost:5173
```
Docker me ho to:
```bash
docker compose up -d --force-recreate api
```

## Folder
```
src/
  api.js                  fetch wrapper (token, errors, 429)
  utils.js                formatINR, monthlyTotal, monthLabel
  context/AuthContext.jsx login, register, logout, localStorage
  components/             ProtectedRoute, ExpenseForm, ExpenseList
  pages/                  AuthPage (login/register), Dashboard
  App.jsx                 routes
```

## Build
```bash
npm run build     # dist/ folder, static files
npm run preview
```
Dhyan: VITE_API_URL build ke waqt bundle me chala jaata hai. Deploy ke time production ka API URL do.
