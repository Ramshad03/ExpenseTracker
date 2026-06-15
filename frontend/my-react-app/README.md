# Expense Tracker

A full-stack expense tracker with a React frontend and an Express backend. Expenses are
stored locally in a JSON file (`backend/data/expenses.json`) — no database setup required.

## Project Structure

```
expense-tracker/
├── backend/                # Express API server (port 5000)
│   ├── data/
│   │   └── expenses.json   # Local data store
│   └── server.js
└── frontend/
    └── my-react-app/       # React frontend (this app, port 3000)
```

## Prerequisites

- Node.js and npm

## Running the Project

### 1. Start the backend

```bash
cd backend
npm install
npm run dev    # or: npm start
```

The API runs at [http://localhost:5000](http://localhost:5000).

### 2. Start the frontend

In a separate terminal:

```bash
cd frontend/my-react-app
npm install
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000) and calls the API at
`http://localhost:5000`.

## API Endpoints

| Method | Endpoint           | Description          |
|--------|--------------------|-----------------------|
| GET    | /api/expenses      | Get all expenses      |
| POST   | /api/expenses      | Create a new expense  |
| PUT    | /api/expenses/:id  | Update an expense     |
| DELETE | /api/expenses/:id  | Delete an expense     |

## Frontend Scripts

This app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- `npm start` — run the app in development mode
- `npm test` — launch the test runner
- `npm run build` — build the app for production
