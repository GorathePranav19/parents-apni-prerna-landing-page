import { Blog } from '../models/Blog.js'

export async function listBlogs(req, res) {
  const blogs = await Blog.find({})
    .sort({ publishedAt: -1 })
    .select('title slug category excerpt featuredImage readingTime publishedAt author')
    .lean()

  res.json({ blogs })
}

export async function getBlogBySlug(req, res) {
  const { slug } = req.params
  const blog = await Blog.findOne({ slug }).lean()

  if (!blog) {
    return res.status(404).json({ message: 'Blog not found' })
  }

  return res.json({ blog })
}

