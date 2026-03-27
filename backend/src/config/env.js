import path from 'node:path'
import { fileURLToPath } from 'node:url'

import dotenv from 'dotenv'

dotenv.config()

const currentDir = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(currentDir, '../../.env') })

function readRequired(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.BLOG_API_PORT || process.env.PORT || 4000),
  mongoUri: readRequired('MONGODB_URI'),
  privateApiKey: readRequired('BLOG_PRIVATE_API_KEY'),
  corsOrigin: process.env.BLOG_API_CORS_ORIGIN || process.env.CLIENT_ORIGIN || '*',
  sanityProjectId: process.env.SANITY_PROJECT_ID || null,
  sanityDataset: process.env.SANITY_DATASET || null,
  sanityToken: process.env.SANITY_TOKEN || null,
  sanityApiVersion: process.env.SANITY_API_VERSION || '2024-10-01',
}

export function isProduction() {
  return env.nodeEnv === 'production'
}
