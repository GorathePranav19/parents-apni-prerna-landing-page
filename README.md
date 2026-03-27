# Apni Prerna Landing Page + Blog API

This repository contains:
- Frontend landing page + blog UI in `src/` (React + Vite)
- Backend blog API in `backend/` (Express + MongoDB + optional Sanity image upload)

## What Was Cleaned Up

To reduce duplication and keep one backend source of truth:
- Removed the legacy `server/` API folder (duplicate backend implementation)
- Moved blog seeding to `backend/scripts/seedBlogs.js`
- Moved seed content to `backend/seedData/blogs.js`
- Updated pricing copy from old `999` references to `₹99/month`

## Prerequisites

- Node.js 20+
- npm 10+
- MongoDB URI

## Step-by-Step: Start the Project

### 1. Install dependencies

```bash
npm install
```

### 2. Confirm environment files

You mentioned `.env` files are already configured. If needed later, templates are:
- Root: `.env.example`
- Backend: `backend/.env.example`

Required backend variables:
- `MONGODB_URI`
- `BLOG_PRIVATE_API_KEY`

Optional (only for image upload endpoints):
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_TOKEN`

### 3. Start backend API (Terminal 1)

```bash
npm run dev:api
```

Expected API URL: `http://localhost:4000`

Health check:

```bash
curl http://localhost:4000/api/health
```

### 4. Start frontend app (Terminal 2)

```bash
npm run dev
```

Expected frontend URL: `http://localhost:5173`

### 5. Open the app

- Landing page: `http://localhost:5173/`
- Blog list: `http://localhost:5173/blogs`

## Optional: Seed Demo Blogs

```bash
npm run seed:blogs
```

This now seeds through the active backend model.

## Quality Checks

Run lint:

```bash
npm run lint
```

Run backend tests:

```bash
npm run test:api
```

Build frontend:

```bash
npm run build
```

## API Endpoints

- `GET /api/health`
- `POST /api/blog-images` (private, multipart field: `image`)
- `POST /api/blogs` (private, JSON or multipart, optional field: `heroImage`)
- `GET /api/blogs` (public, published only by default)
- `GET /api/blogs/:slug` (public, published only by default)
- `PATCH /api/blogs/:id/publish` (private)

Private endpoints accept:
- `x-api-key: <BLOG_PRIVATE_API_KEY>`
- `Authorization: Bearer <BLOG_PRIVATE_API_KEY>`
