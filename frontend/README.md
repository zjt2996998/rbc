# Frontend – React App

This is the frontend for the RBC Full Stack Demo built with React + TypeScript.

## 📦 Features

- Login form with token authentication
- Paginated message list
- Role-based UI (admin vs readonly)
- API integration with FastAPI backend
- Dockerized for production with Nginx

## 🚀 Local Development

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: `http://localhost:5173`

## 🐳 Docker Build

```bash
docker build -t frontend .
docker run -p 3000:80 frontend
```

## ⚙️ Vite Configuration

Make sure `vite.config.ts` sets `outDir: 'dist'` and supports production build:

```ts
export default defineConfig({
  build: { outDir: "dist" },
  server: { host: true, port: 5173 }
});
```
