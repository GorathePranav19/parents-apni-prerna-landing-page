import slugify from 'slugify'

export function toSlug(value) {
  const source = String(value || '').trim()

  if (!source) {
    return 'blog-post'
  }

  return slugify(source, {
    lower: true,
    strict: true,
    trim: true,
  })
}

export async function generateUniqueSlug(model, preferred) {
  const base = toSlug(preferred)
  let slug = base
  let suffix = 2

  while (await model.exists({ slug })) {
    slug = `${base}-${suffix}`
    suffix += 1
  }

  return slug
}
