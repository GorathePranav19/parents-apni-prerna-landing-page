import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { connectDatabase } from './db.js'
import blogRouter from './routes/blogRoutes.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 4000)

const allowedOrigins = (process.env.CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors(
    allowedOrigins.length
      ? {
          origin: allowedOrigins,
        }
      : {},
  ),
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/blogs', blogRouter)

app.use((error, _req, res, _next) => {
  const status = error.status || 500
  res.status(status).json({ message: error.message || 'Internal server error' })
})

async function startServer() {
  await connectDatabase(process.env.MONGODB_URI)

  app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start server:', error.message)
  process.exit(1)
})

