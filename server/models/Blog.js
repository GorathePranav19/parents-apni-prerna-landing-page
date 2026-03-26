import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema(
  {
    heading: { type: String, trim: true },
    paragraphs: [{ type: String, trim: true }],
    list: [{ type: String, trim: true }],
  },
  { _id: false },
)

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, trim: true, default: 'Blog' },
    excerpt: { type: String, required: true, trim: true },
    featuredImage: { type: String, required: true, trim: true },
    readingTime: { type: String, required: true, trim: true },
    publishedAt: { type: Date, required: true },
    author: {
      name: { type: String, required: true, trim: true },
      role: { type: String, trim: true, default: '' },
    },
    tags: [{ type: String, trim: true }],
    sections: [sectionSchema],
    quote: {
      text: { type: String, trim: true, default: '' },
      by: { type: String, trim: true, default: '' },
    },
  },
  { timestamps: true },
)

export const Blog = mongoose.model('Blog', blogSchema)

