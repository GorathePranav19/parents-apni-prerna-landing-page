import app from './src/app.js'
import { connectToDatabase } from './src/config/database.js'
import { env } from './src/config/env.js'

async function startServer() {
  await connectToDatabase()

  app.listen(env.port, () => {
    console.log(`Blog API listening on port ${env.port}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start Blog API', error)
  process.exit(1)
})
