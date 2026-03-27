import mongoose from 'mongoose'

import { getReadingTimeMinutes } from '../utils/reading-time.js'
import { toSlug } from '../utils/slug.js'

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 180 },
    slug: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
    excerpt: { type: String, default: '', maxlength: 400 },
    contentMarkdown: { type: String, required: true, trim: true },
    heroImage: {
      url: { type: String, default: '' },
      assetRef: { type: String, default: '' },
      altText: { type: String, default: '' },
    },
    tags: { type: [String], default: [] },
    category: { type: String, default: '' },
    isPublished: { type: Boolean, default: false, index: true },
    publishedAt: { type: Date, default: null },
    metaTitle: { type: String, default: '', maxlength: 180 },
    metaDescription: { type: String, default: '', maxlength: 320 },
    readingTimeMinutes: { type: Number, default: 1, min: 1 },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id
        delete ret._id
        return ret
      },
    },
  },
)

blogSchema.index({ createdAt: -1 })

blogSchema.pre('validate', function preValidate(next) {
  if (!this.slug) {
    this.slug = toSlug(this.title)
  }

  this.readingTimeMinutes = getReadingTimeMinutes(this.contentMarkdown)

  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = new Date()
  }

  if (!this.isPublished) {
    this.publishedAt = null
  }

  next()
})

export const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema)
