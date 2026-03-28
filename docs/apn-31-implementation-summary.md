# APN-31 Implementation Summary (Reopen Fix Pass)

## Scope Closed

Resolved reopened QA blockers from [APN-32](/APN/issues/APN-32):

1. Markdown image blocks were not rendering in blog detail view.
2. APN-31 blog content used placeholder image URLs instead of concrete project assets.

## Files Changed

1. `src/lib/blogApi.js`
   - Added missing `stripMarkdown` helper used for excerpt inference.
   - Fixed markdown section parser heading extraction.
   - Added ordered-list parsing support and stable list-type metadata.
   - Normalized hero image alt text (`featuredImageAlt`) for UI rendering.
2. `src/components/SingleBlogTemplate.jsx`
   - Added markdown image block detection (`![alt](url)`) inside article paragraphs.
   - Rendered image blocks as `<img>` sections (lazy-loaded) with preserved alt text.
   - Rendered ordered lists as `<ol>` and unordered lists as `<ul>`.
   - Switched hero `<img alt>` to API-provided hero alt text.
3. `backend/seedData/apn-31-blog.js`
   - Replaced all placeholder URLs with local project assets under `/blog-images/...`.
   - Aligned blog copy to APN-30 source text with required image placements.
4. `public/blog-images/*.webp` (new)
   - `blog-screen-time-system-hero.webp` (1200x675)
   - `blog-screen-time-conflict-scene.webp` (1200x800)
   - `blog-3-layer-framework-diagram.webp` (1400x1050)
   - `blog-study-routine-board.webp` (1200x900)
   - `blog-dashboard-guidance-view.webp` (1440x900)
   - `blog-weekly-review-conversation.webp` (1200x800)

## Image Delivery

All APN-30 required image slots now point to concrete local `.webp` assets (no `picsum.photos`/`placehold.co` URLs remain in APN-31 seed data).

## Verification Performed

- `npm run lint`
- `npm run build`
- `npm run seed:apn31`
- `npm run test:api`
- API spot-check:
  - `GET /api/blogs/screen-time-fights-3-layer-family-system`
  - Confirmed hero URL and all 5 in-article markdown image URLs resolve to `/blog-images/*.webp`.

## Status

APN-31 implementation fix pass is complete and ready for QA re-test in [APN-32](/APN/issues/APN-32).
