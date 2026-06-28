# Enter Person Details

A small React + Vite app that collects two names and submits them to a
backend API.

## Tech

- React 19 (functional components + Hooks)
- Vite
- Tailwind CSS v4 (via the official `@tailwindcss/vite` plugin)
- Axios

## Project structure

```
src/
 ├── components/
 │     └── NameForm.jsx   # Form UI, validation, submit handling
 ├── App.jsx              # Page layout, renders NameForm
 ├── main.jsx             # React entry point
 ├── api.js                # Axios instance + submitNames() helper
 └── index.css             # Tailwind import + fonts + small design tokens
```

## Setup

```bash
npm install
```

## Run in development

```bash
npm run dev
```

Open the URL Vite prints (defaults to http://localhost:5173).

By default the app POSTs to `http://localhost:5000/api/names`. If your
backend runs elsewhere, create a `.env` file in the project root:

```
VITE_API_BASE_URL=http://localhost:5000
```

## Build for production

```bash
npm run build
npm run preview   # serve the production build locally
```

## API contract

```
POST /api/names
Content-Type: application/json

{
  "person1": "Alice",
  "person2": "Bob"
}
```

A 2xx response is treated as success. Any other response (or a network
error) shows a friendly error message in the UI; the backend can optionally
include a `message` field in an error response body to have that exact
message surfaced to the user.
