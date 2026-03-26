const apiBase = (import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:4000' : '')).replace(/\/$/, '')

function formatDate(dateValue) {
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date)
}

function normalizePost(post) {
  return {
    id: post._id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    featuredImage: post.featuredImage,
    readingTime: post.readingTime,
    publishedAt: formatDate(post.publishedAt),
    author: post.author?.name || 'Apni Prerna Team',
    authorRole: post.author?.role || '',
    tags: post.tags || [],
    sections: post.sections || [],
    quote: post.quote || null,
  }
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || ''
  const raw = await response.text()

  if (!raw) {
    return {}
  }

  if (!contentType.includes('application/json')) {
    const startsLikeHtml = raw.trim().startsWith('<')

    if (startsLikeHtml) {
      throw new Error('Blog API returned HTML instead of JSON. Start the backend server or set VITE_API_BASE_URL.')
    }

    throw new Error('Blog API returned an unexpected response format.')
  }

  try {
    return JSON.parse(raw)
  } catch {
    throw new Error('Blog API returned invalid JSON.')
  }
}

async function fetchJson(path) {
  const response = await fetch(`${apiBase}${path}`)
  const payload = await parseResponse(response)

  if (!response.ok) {
    throw new Error(payload.message || `Request failed with status ${response.status}`)
  }

  return payload
}

export async function fetchBlogs() {
  const payload = await fetchJson('/api/blogs')
  return (payload.blogs || []).map(normalizePost)
}

export async function fetchBlogBySlug(slug) {
  const payload = await fetchJson(`/api/blogs/${encodeURIComponent(slug)}`)
  return payload.blog ? normalizePost(payload.blog) : null
}
