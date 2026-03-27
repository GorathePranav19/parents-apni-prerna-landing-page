# Apni Prerna Landing Page + Blog API

This repository now includes:
- A React + Vite landing page (`src/`)
- A backend blog publishing service (`backend/`) using Express, MongoDB, and Sanity image uploads

## Frontend

```bash
npm install
npm run dev
```

## Blog API

### 1. Configure environment

```bash
cp backend/.env.example backend/.env
```

The backend loads `backend/.env` (and also accepts root `.env` values for compatibility).

Set the required values in `backend/.env`:
- `MONGODB_URI`
- `BLOG_PRIVATE_API_KEY`
- `SANITY_PROJECT_ID`
- `SANITY_DATASET`
- `SANITY_TOKEN`

`SANITY_*` variables are required for image upload endpoints (`/api/blog-images` and multipart `heroImage` uploads on `/api/blogs`).

### 2. Run API

```bash
npm run dev:api
```

Default API base URL: `http://localhost:4000`

### 3. Run quality checks

```bash
npm run lint
npm run test:api
```

## API Endpoints

- `GET /api/health`
- `POST /api/blog-images` (private, multipart field: `image`)
- `POST /api/blogs` (private, JSON or multipart, optional field: `heroImage`)
- `GET /api/blogs` (public, published only by default)
- `GET /api/blogs/:slug` (public, published only by default)
- `PATCH /api/blogs/:id/publish` (private)

Private endpoints require:
- `x-api-key: <BLOG_PRIVATE_API_KEY>` or
- `Authorization: Bearer <BLOG_PRIVATE_API_KEY>`

## Validation and Error Behavior

- Invalid JSON payloads return `400` with message: `Invalid JSON payload.`
- Invalid pagination/query values (for example non-integer `page` or `limit`) return `400`.
- Invalid blog IDs for publish operations return `400`.
- Missing/invalid auth on private routes returns `401`.
- Oversized file uploads (>5MB) return `413`.

## Blog Model Highlights

- Markdown-first storage (`contentMarkdown`)
- Unique slug with collision handling
- Draft/publish workflow (`isPublished`, `publishedAt`)
- Reading time auto-calculation
- Tags + category + SEO fields (`metaTitle`, `metaDescription`)
- Hero image metadata (`url`, `assetRef`, `altText`)

## Example Requests

Create a blog (private):

```bash
curl -X POST http://localhost:4000/api/blogs \
  -H "Content-Type: application/json" \
  -H "x-api-key: $BLOG_PRIVATE_API_KEY" \
  -d '{
    "title": "How to Build Safe Digital Habits",
    "contentMarkdown": "# Safe Habits\nStart with a family agreement...",
    "excerpt": "Practical digital safety steps for parents.",
    "tags": "parenting,digital-safety",
    "isPublished": true
  }'
```

Upload inline image (private):

```bash
curl -X POST http://localhost:4000/api/blog-images \
  -H "x-api-key: $BLOG_PRIVATE_API_KEY" \
  -F "image=@./hero.png" \
  -F "alt=Dashboard screenshot"
```
