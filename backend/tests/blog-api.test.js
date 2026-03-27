import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { after, before, beforeEach, describe, it } from 'node:test'

import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import request from 'supertest'

const API_KEY = 'test-private-api-key'

let app
let Blog
let connectToDatabase
let setSanityClientFactoryForTesting
let resetSanityClientForTesting
let mongoServer

function withApiKey(req) {
  return req.set('x-api-key', API_KEY)
}

describe('Blog API', { concurrency: false }, () => {
  before(async () => {
    mongoServer = await MongoMemoryServer.create()

    process.env.NODE_ENV = 'test'
    process.env.MONGODB_URI = mongoServer.getUri()
    process.env.BLOG_PRIVATE_API_KEY = API_KEY
    process.env.BLOG_API_CORS_ORIGIN = '*'
    process.env.SANITY_PROJECT_ID = 'test-project'
    process.env.SANITY_DATASET = 'test-dataset'
    process.env.SANITY_TOKEN = 'test-token'

    ;({ connectToDatabase } = await import('../src/config/database.js'))
    ;({ Blog } = await import('../src/models/blog.js'))
    ;({ default: app } = await import('../src/app.js'))
    ;({
      setSanityClientFactoryForTesting,
      resetSanityClientForTesting,
    } = await import('../src/services/sanity-image-service.js'))

    setSanityClientFactoryForTesting(() => ({
      assets: {
        upload: async (_assetType, _buffer, options) => ({
          _id: `image-${randomUUID()}`,
          url: `https://cdn.test.sanity/${encodeURIComponent(options.filename)}`,
        }),
      },
    }))

    await connectToDatabase()
  })

  after(async () => {
    resetSanityClientForTesting()
    await mongoose.disconnect()
    await mongoServer.stop()
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  it('rejects blog creation without API key', async () => {
    const response = await request(app).post('/api/blogs').send({
      title: 'Unauthorized',
      contentMarkdown: 'Denied',
    })

    assert.equal(response.status, 401)
    assert.equal(response.body.success, false)
  })

  it('creates a blog and generates a unique slug', async () => {
    const first = await withApiKey(request(app).post('/api/blogs')).send({
      title: 'Safe Parenting Habits',
      contentMarkdown: '# Intro\nPractical steps',
      tags: 'parenting, safety',
      isPublished: true,
    })

    assert.equal(first.status, 201)
    assert.equal(first.body.data.slug, 'safe-parenting-habits')
    assert.equal(first.body.data.isPublished, true)
    assert.ok(first.body.data.publishedAt)

    const second = await withApiKey(request(app).post('/api/blogs')).send({
      title: 'Safe Parenting Habits',
      contentMarkdown: 'Another version',
    })

    assert.equal(second.status, 201)
    assert.equal(second.body.data.slug, 'safe-parenting-habits-2')
  })

  it('returns validation errors for malformed create payloads', async () => {
    const invalidTags = await withApiKey(request(app).post('/api/blogs')).send({
      title: 'Malformed Tags',
      contentMarkdown: 'Body',
      tags: { invalid: true },
    })

    assert.equal(invalidTags.status, 400)
    assert.match(invalidTags.body.error.message, /`tags` must be a comma-separated string/)

    const invalidBoolean = await withApiKey(request(app).post('/api/blogs')).send({
      title: 'Malformed Boolean',
      contentMarkdown: 'Body',
      isPublished: 'not-a-boolean',
    })

    assert.equal(invalidBoolean.status, 400)
    assert.match(invalidBoolean.body.error.message, /`isPublished` must be a boolean/)
  })

  it('returns 400 on malformed JSON payload', async () => {
    const response = await withApiKey(
      request(app)
        .post('/api/blogs')
        .set('content-type', 'application/json')
        .send('{"title":"Broken"'),
    )

    assert.equal(response.status, 400)
    assert.equal(response.body.error.message, 'Invalid JSON payload.')
  })

  it('lists only published blogs by default and drafts with authenticated includeDrafts', async () => {
    await Blog.create({
      title: 'Published',
      contentMarkdown: 'Live',
      slug: 'published',
      isPublished: true,
    })
    await Blog.create({
      title: 'Draft',
      contentMarkdown: 'Hidden',
      slug: 'draft',
      isPublished: false,
    })

    const publicList = await request(app).get('/api/blogs')
    assert.equal(publicList.status, 200)
    assert.equal(publicList.body.data.length, 1)
    assert.equal(publicList.body.data[0].slug, 'published')

    const draftList = await withApiKey(request(app).get('/api/blogs?includeDrafts=true'))
    assert.equal(draftList.status, 200)
    assert.equal(draftList.body.data.length, 2)
  })

  it('validates list pagination parameters', async () => {
    const badPage = await request(app).get('/api/blogs?page=abc')
    assert.equal(badPage.status, 400)
    assert.match(badPage.body.error.message, /`page` must be an integer/)

    const badLimit = await request(app).get('/api/blogs?limit=1000')
    assert.equal(badLimit.status, 400)
    assert.match(badLimit.body.error.message, /`limit` must be an integer/)
  })

  it('returns drafts by slug only when includeDraft is authenticated', async () => {
    await Blog.create({
      title: 'Hidden Draft',
      contentMarkdown: 'Draft',
      slug: 'hidden-draft',
      isPublished: false,
    })

    const publicResponse = await request(app).get('/api/blogs/hidden-draft')
    assert.equal(publicResponse.status, 404)

    const privateResponse = await withApiKey(request(app).get('/api/blogs/hidden-draft?includeDraft=true'))
    assert.equal(privateResponse.status, 200)
    assert.equal(privateResponse.body.data.slug, 'hidden-draft')
  })

  it('publishes and unpublishes blogs and validates invalid ids', async () => {
    const blog = await Blog.create({
      title: 'Publish Flow',
      contentMarkdown: 'State machine',
      slug: 'publish-flow',
      isPublished: false,
    })

    const invalidId = await withApiKey(request(app).patch('/api/blogs/not-an-id/publish')).send({
      isPublished: true,
    })

    assert.equal(invalidId.status, 400)
    assert.equal(invalidId.body.error.message, 'Invalid blog id.')

    const publishResponse = await withApiKey(request(app).patch(`/api/blogs/${blog.id}/publish`)).send({
      isPublished: true,
    })

    assert.equal(publishResponse.status, 200)
    assert.equal(publishResponse.body.data.isPublished, true)
    assert.ok(publishResponse.body.data.publishedAt)

    const unpublishResponse = await withApiKey(request(app).patch(`/api/blogs/${blog.id}/publish`)).send({
      isPublished: false,
    })

    assert.equal(unpublishResponse.status, 200)
    assert.equal(unpublishResponse.body.data.isPublished, false)
    assert.equal(unpublishResponse.body.data.publishedAt, null)
  })

  it('requires multipart image and returns markdown on upload', async () => {
    const unauthorized = await request(app)
      .post('/api/blog-images')
      .attach('image', Buffer.from('fake image'), 'hero.png')

    assert.equal(unauthorized.status, 401)

    const missingFile = await withApiKey(request(app).post('/api/blog-images')).field('alt', 'Missing')
    assert.equal(missingFile.status, 400)

    const uploadResponse = await withApiKey(request(app).post('/api/blog-images'))
      .field('alt', 'Hero Alt')
      .attach('image', Buffer.from('fake image bytes'), 'hero.png')

    assert.equal(uploadResponse.status, 201)
    assert.equal(uploadResponse.body.success, true)
    assert.match(uploadResponse.body.data.url, /https:\/\/cdn\.test\.sanity\//)
    assert.match(uploadResponse.body.data.markdown, /^!\[Hero Alt\]\(https:\/\/cdn\.test\.sanity\//)
  })
})
