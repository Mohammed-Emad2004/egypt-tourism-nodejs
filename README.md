# Egypt_Tourism — Local setup

Quick steps so anyone cloning the repo can run frontend + backend on port 3000 and use a local or Atlas MongoDB without issues.

1. Install dependencies

```bash
npm install
```

2. Provide environment variables

- Copy `.env.example` to `.env` and edit if you need to use a remote Atlas URI.

Example `.env`:

```
MONGO_URI=mongodb://127.0.0.1:27017/egypt_tourism
PORT=3000
```

3. Start MongoDB

- If you want a local DB: install MongoDB Community (Windows installer) and ensure the MongoDB service is running.
- Or use MongoDB Atlas: create a cluster, add your IP to the Access List, create a DB user and put the connection string in `MONGO_URI`.

4. Seed initial data (optional)

```bash
node src/seed.js
```

5. Run the app

```bash
npm start       # production-ish: node src/server.js
npm run dev     # during development (requires nodemon)
```

Notes
- Backend and frontend are both served by the Express server at `http://localhost:3000` (static files in `public/` and API under `/api`).
- Keep your real credentials out of git: use `.env` and it's already ignored by `.gitignore`.