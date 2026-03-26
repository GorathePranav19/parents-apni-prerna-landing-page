import dotenv from 'dotenv'
import { connectDatabase } from './db.js'
import { Blog } from './models/Blog.js'
import { seedBlogs } from './seedData/blogs.js'

dotenv.config()

async function seed() {
  await connectDatabase(process.env.MONGODB_URI)

  for (const blog of seedBlogs) {
    await Blog.findOneAndUpdate({ slug: blog.slug }, blog, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    })
  }

  console.log(`Seeded ${seedBlogs.length} blogs`)
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error.message)
  process.exit(1)
})

