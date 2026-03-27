import { connectToDatabase } from '../src/config/database.js'
import { Blog } from '../src/models/blog.js'
import { seedBlogs } from '../seedData/blogs.js'

async function seed() {
  await connectToDatabase()

  for (const entry of seedBlogs) {
    await Blog.findOneAndUpdate(
      { slug: entry.slug },
      {
        title: entry.title,
        slug: entry.slug,
        excerpt: entry.excerpt,
        contentMarkdown: entry.contentMarkdown,
        heroImage: {
          url: entry.heroImageUrl,
          altText: entry.title,
          assetRef: '',
        },
        tags: entry.tags,
        category: entry.category,
        isPublished: true,
        publishedAt: new Date(entry.publishedAt),
        metaTitle: entry.title,
        metaDescription: entry.excerpt,
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    )
  }

  console.log(`Seeded ${seedBlogs.length} blogs into backend collection`)
}

seed()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('Seed failed:', error.message)
    process.exit(1)
  })
