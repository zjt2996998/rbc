# RBC Full Stack Demo App

This is a full-stack demo web application built with:

- 🔧 Backend: FastAPI + MongoDB + Redis
- 🎨 Frontend: React + TypeScript + Vite
- 🐳 Dockerized (backend, frontend, mongo, redis)
- 🔐 OAuth2 + JWT + Role-based access

---

## 📦 Architecture Overview

```
[ React SPA ]
     |
     ▼
[Nginx Docker Container]
     |
     ▼
[FastAPI Backend] --> [MongoDB]
           |
           └────> [Redis Cache]
```

---

## 🧪 Roles

- `admin` — Can view + add messages
- `readonly` — Can only view

---

## ⚙️ How to Run

```bash
docker-compose build
docker-compose up
```

Frontend: [http://localhost:3000](http://localhost:3000)  
Backend API: [http://localhost:8000](http://localhost:8000/docs)

---

## 🔐 Login Info

| Username | Password    | Role     |
|----------|-------------|----------|
| admin    | adminpass   | admin    |
| viewer   | viewerpass  | readonly |

---

## 📎 API Highlights

- `POST /token` — Login
- `GET /messages` — Paginated messages
- `POST /messages` — Add (admin only)

---

## 📂 Project Structure

```
.
├── frontend/         # React + Vite
├── backend/          # FastAPI + MongoDB + Redis
├── docker-compose.yml
└── README.md
```

---

## 🛠️ TODO

- Add unit tests
- Add logout support
- Deployment to cloud (AWS / Azure / GCP)
