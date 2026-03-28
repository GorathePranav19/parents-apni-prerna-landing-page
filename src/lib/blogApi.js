const apiBase = (import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? 'http://localhost:4000' : '')).replace(/\/$/, '')

function formatDate(dateValue) {
  const date = new Date(dateValue)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date)
}

function toSectionsFromMarkdown(markdown) {
  if (!markdown) {
    return []
  }

  const lines = String(markdown).split('\n')
  const sections = []
  let currentSection = null
  let currentParagraphs = []
  let currentList = []
  let inCodeBlock = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Skip code blocks
    if (line.startsWith('```')) {
      inCodeBlock = true
      continue
    }
    if (line.endsWith('```')) {
      inCodeBlock = false
      continue
    }

    // Skip processing if in code block
    if (inCodeBlock) {
      currentParagraphs.push(line)
      continue
    }

    // Check for heading (h1-h6)
    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/)
    if (headingMatch) {
      // Save current section if exists
      if (currentParagraphs.length > 0 || currentList.length > 0 || currentSection) {
        sections.push({
          heading: currentSection || '',
          paragraphs: currentParagraphs,
          list: currentList,
        })
        currentParagraphs = []
        currentList = []
      }

      currentSection = headingMatch[1].trim()
      continue
    }

    // Check for list item
    const listMatch = line.match(/^[-*]\s+(.*)$/)
    if (listMatch) {
      currentList.push(listMatch[1].trim())
      continue
    }

    // Check for empty line (section separator)
    if (line === '' && (currentParagraphs.length > 0 || currentList.length > 0)) {
      sections.push({
        heading: currentSection || '',
        paragraphs: currentParagraphs,
        list: currentList,
      })
      currentParagraphs = []
      currentList = []
    }

    // Regular paragraph
    if (line && !headingMatch && !listMatch) {
      currentParagraphs.push(line)
    }
  }

  // Add last section if exists
  if (currentParagraphs.length > 0 || currentList.length > 0 || currentSection) {
    sections.push({
      heading: currentSection || '',
      paragraphs: currentParagraphs,
      list: currentList,
    })
  }

  return sections
}

function inferExcerpt(post) {
  if (post.excerpt) {
    return post.excerpt
  }

  const snippet = stripMarkdown(post.contentMarkdown || '')
  if (snippet.length <= 180) {
    return snippet
  }

  return `${snippet.slice(0, 177)}...`
}

function inferReadingTime(post) {
  if (post.readingTime) {
    return post.readingTime
  }

  if (Number.isFinite(post.readingTimeMinutes)) {
    return `${post.readingTimeMinutes} min read`
  }

  return ''
}

function normalizePost(post) {
  const sections = Array.isArray(post.sections) && post.sections.length ? post.sections : toSectionsFromMarkdown(post.contentMarkdown)

  return {
    id: post.id || post._id,
    slug: post.slug,
    title: post.title,
    excerpt: inferExcerpt(post),
    category: post.category || 'Blog',
    featuredImage: post.featuredImage || post.heroImage?.url || '/og-image.png',
    readingTime: inferReadingTime(post),
    publishedAt: formatDate(post.publishedAt || post.createdAt),
    author: post.author?.name || 'Apni Prerna Team',
    authorRole: post.author?.role || '',
    tags: Array.isArray(post.tags) ? post.tags : [],
    sections,
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
    throw new Error(payload.error?.message || payload.message || `Request failed with status ${response.status}`)
  }

  return payload
}

export async function fetchBlogs() {
  const payload = await fetchJson('/api/blogs')
  const list = Array.isArray(payload.blogs) ? payload.blogs : Array.isArray(payload.data) ? payload.data : []
  return list.map(normalizePost)
}

export async function fetchBlogBySlug(slug) {
  const payload = await fetchJson(`/api/blogs/${encodeURIComponent(slug)}`)
  const blog = payload.blog || payload.data || null
  return blog ? normalizePost(blog) : null
}
