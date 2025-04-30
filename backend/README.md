# Backend – FastAPI App

This is the backend for the RBC Full Stack Demo built with FastAPI, MongoDB, and Redis.

## 📦 Features

- OAuth2-based login
- JWT access tokens with role claims
- Role-based access control (admin vs readonly)
- MongoDB for persistent storage
- Redis caching for paginated message list
- Dockerized with entrypoint script and init seeding

## 📁 Directory Structure

```
backend/
├── app/
│   ├── api/           # API routes
│   ├── core/          # Security, deps
│   ├── db/            # Mongo + Redis connectors, seed
│   ├── models/        # Pydantic models
│   └── main.py        # FastAPI app entry
└── Dockerfile
```

## 🔐 Default Users

- `admin` / `adminpass` — Can post
- `viewer` / `viewerpass` — Read-only

## 🐳 Run with Docker

```bash
docker build -t backend .
docker run -p 8000:8000 rbc-backend
```

## ✅ Test Auth

- `POST /token` with `{ username, password }`
- Use `Authorization: Bearer <token>` in headers
