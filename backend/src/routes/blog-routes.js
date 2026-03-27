import { Router } from 'express'
import mongoose from 'mongoose'
import multer from 'multer'

import { Blog } from '../models/blog.js'
import { requireApiKey, hasValidApiKey } from '../middleware/auth.js'
import { asyncHandler } from '../utils/async-handler.js'
import { HttpError } from '../utils/http-error.js'
import { uploadImageToSanity } from '../services/sanity-image-service.js'
import { generateUniqueSlug } from '../utils/slug.js'

const router = Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
})

function parseTags(raw) {
  if (raw === undefined || raw === null || raw === '') {
    return []
  }

  if (Array.isArray(raw)) {
    return raw
      .map((tag) => {
        if (typeof tag !== 'string') {
          throw new HttpError(400, '`tags` must contain only strings.')
        }

        return tag.trim()
      })
      .filter(Boolean)
  }

  if (typeof raw === 'string') {
    return raw
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  }

  throw new HttpError(400, '`tags` must be a comma-separated string or an array of strings.')
}

function parseBoolean(value, fieldName, defaultValue) {
  if (value === undefined || value === null || value === '') {
    return defaultValue
  }

  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()
    if (['true', '1', 'yes'].includes(normalized)) {
      return true
    }

    if (['false', '0', 'no'].includes(normalized)) {
      return false
    }
  }

  throw new HttpError(400, `\`${fieldName}\` must be a boolean.`)
}

function parseInteger(value, fieldName, { defaultValue, min, max }) {
  if (value === undefined || value === null || value === '') {
    return defaultValue
  }

  const parsed = Number(value)
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    throw new HttpError(400, `\`${fieldName}\` must be an integer between ${min} and ${max}.`)
  }

  return parsed
}

function parseOptionalString(value, fieldName, maxLength = Infinity) {
  if (value === undefined || value === null) {
    return ''
  }

  if (typeof value !== 'string') {
    throw new HttpError(400, `\`${fieldName}\` must be a string.`)
  }

  const normalized = value.trim()
  if (normalized.length > maxLength) {
    throw new HttpError(400, `\`${fieldName}\` must be at most ${maxLength} characters.`)
  }

  return normalized
}

function parseRequiredString(value, fieldName, maxLength = Infinity) {
  if (typeof value !== 'string') {
    throw new HttpError(400, `\`${fieldName}\` is required and must be a string.`)
  }

  const normalized = value.trim()
  if (!normalized) {
    throw new HttpError(400, `\`${fieldName}\` is required.`)
  }

  if (normalized.length > maxLength) {
    throw new HttpError(400, `\`${fieldName}\` must be at most ${maxLength} characters.`)
  }

  return normalized
}

router.post(
  '/',
  requireApiKey,
  upload.single('heroImage'),
  asyncHandler(async (req, res) => {
    const title = parseRequiredString(req.body.title, 'title', 180)
    const contentMarkdown = parseRequiredString(req.body.contentMarkdown, 'contentMarkdown')

    if (req.body.slug !== undefined && typeof req.body.slug !== 'string') {
      throw new HttpError(400, '`slug` must be a string when provided.')
    }

    const requestedSlug = req.body.slug === undefined ? title : req.body.slug.trim()
    if (req.body.slug !== undefined && !requestedSlug) {
      throw new HttpError(400, '`slug` cannot be empty when provided.')
    }

    const slug = await generateUniqueSlug(Blog, requestedSlug)

    const heroImageAltText = parseOptionalString(req.body.heroImageAltText, 'heroImageAltText', 180)
    let heroImage = {
      url: parseOptionalString(req.body.heroImageUrl, 'heroImageUrl'),
      assetRef: parseOptionalString(req.body.heroImageAssetRef, 'heroImageAssetRef'),
      altText: heroImageAltText,
    }

    if (req.file) {
      const uploadedImage = await uploadImageToSanity(req.file)
      heroImage = {
        ...uploadedImage,
        altText: heroImageAltText,
      }
    }

    const blog = await Blog.create({
      title,
      slug,
      excerpt: parseOptionalString(req.body.excerpt, 'excerpt', 400),
      contentMarkdown,
      heroImage,
      tags: parseTags(req.body.tags),
      category: parseOptionalString(req.body.category, 'category', 120),
      isPublished: parseBoolean(req.body.isPublished, 'isPublished', false),
      metaTitle: parseOptionalString(req.body.metaTitle, 'metaTitle', 180),
      metaDescription: parseOptionalString(req.body.metaDescription, 'metaDescription', 320),
    })

    res.status(201).json({
      success: true,
      data: blog,
    })
  }),
)

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const page = parseInteger(req.query.page, 'page', { defaultValue: 1, min: 1, max: 100000 })
    const limit = parseInteger(req.query.limit, 'limit', { defaultValue: 10, min: 1, max: 100 })
    const skip = (page - 1) * limit

    const includeDraftsRequested = parseBoolean(req.query.includeDrafts, 'includeDrafts', false)
    const includeDrafts = includeDraftsRequested && hasValidApiKey(req)

    if (req.query.tag !== undefined && typeof req.query.tag !== 'string') {
      throw new HttpError(400, '`tag` must be a string when provided.')
    }

    const tag = String(req.query.tag || '').trim()

    const filter = includeDrafts ? {} : { isPublished: true }
    if (tag) {
      filter.tags = tag
    }

    const [items, total] = await Promise.all([
      Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Blog.countDocuments(filter),
    ])

    res.json({
      success: true,
      data: items,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    })
  }),
)

router.get(
  '/:slug',
  asyncHandler(async (req, res) => {
    const includeDraftRequested = parseBoolean(req.query.includeDraft, 'includeDraft', false)
    const includeDraft = includeDraftRequested && hasValidApiKey(req)

    const filter = includeDraft
      ? { slug: req.params.slug }
      : { slug: req.params.slug, isPublished: true }

    const blog = await Blog.findOne(filter)
    if (!blog) {
      throw new HttpError(404, 'Blog not found.')
    }

    res.json({
      success: true,
      data: blog,
    })
  }),
)

router.patch(
  '/:id/publish',
  requireApiKey,
  asyncHandler(async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw new HttpError(400, 'Invalid blog id.')
    }

    const isPublished = parseBoolean(req.body.isPublished, 'isPublished', true)

    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      throw new HttpError(404, 'Blog not found.')
    }

    blog.isPublished = isPublished
    blog.publishedAt = isPublished ? new Date() : null
    await blog.save()

    res.json({
      success: true,
      data: blog,
    })
  }),
)

export default router
