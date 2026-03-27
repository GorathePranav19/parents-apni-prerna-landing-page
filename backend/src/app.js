import cors from 'cors'
import express from 'express'

import { env } from './config/env.js'
import blogRoutes from './routes/blog-routes.js'
import blogImageRoutes from './routes/blog-image-routes.js'
import { errorHandler, notFoundHandler } from './middleware/error-handler.js'

const app = express()

app.use(
  cors({
    origin: env.corsOrigin === '*' ? true : env.corsOrigin.split(',').map((origin) => origin.trim()),
  }),
)
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      service: 'apni-prerna-blog-api',
    },
  })
})

app.use('/api/blogs', blogRoutes)
app.use('/api/blog-images', blogImageRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
