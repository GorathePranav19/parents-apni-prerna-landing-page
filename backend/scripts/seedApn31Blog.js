import { connectToDatabase } from '../src/config/database.js'
import { Blog } from '../src/models/blog.js'
import { apn31Blog } from '../seedData/apn-31-blog.js'

async function seed() {
  await connectToDatabase()

  const blog = await Blog.findOneAndUpdate(
    { slug: apn31Blog.slug },
    {
      title: apn31Blog.title,
      slug: apn31Blog.slug,
      excerpt: apn31Blog.excerpt,
      contentMarkdown: apn31Blog.contentMarkdown,
      heroImage: {
        url: apn31Blog.heroImageUrl,
        altText: apn31Blog.heroImageAltText,
        assetRef: '',
      },
      tags: apn31Blog.tags,
      category: apn31Blog.category,
      isPublished: true,
      publishedAt: new Date(),
      metaTitle: apn31Blog.metaTitle,
      metaDescription: apn31Blog.metaDescription,
    },
    {
      upsert: true,
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    },
  )

  console.log(`✓ Seeded blog: ${blog.title}`)
  console.log(`  Slug: ${blog.slug}`)
  console.log(`  Hero Image: ${blog.heroImage.url}`)
  console.log(`  Tags: ${blog.tags.join(', ')}`)
  console.log(`  Status: Published`)
}

seed()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('Seed failed:', error.message)
    process.exit(1)
  })
