import { createClient } from '@sanity/client'

import { env } from '../config/env.js'
import { HttpError } from '../utils/http-error.js'

let client
let createSanityClient = createClient

function getClient() {
  if (!env.sanityProjectId || !env.sanityDataset || !env.sanityToken) {
    throw new HttpError(500, 'Sanity is not configured. Set SANITY_PROJECT_ID, SANITY_DATASET, and SANITY_TOKEN.')
  }

  if (!client) {
    client = createSanityClient({
      projectId: env.sanityProjectId,
      dataset: env.sanityDataset,
      apiVersion: env.sanityApiVersion,
      token: env.sanityToken,
      useCdn: false,
    })
  }

  return client
}

export async function uploadImageToSanity(file) {
  if (!file?.buffer) {
    throw new HttpError(400, 'No file was provided for upload.')
  }

  const sanity = getClient()
  const asset = await sanity.assets.upload('image', file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype,
  })

  return {
    url: asset.url,
    assetRef: asset._id,
  }
}

export function setSanityClientFactoryForTesting(factory) {
  createSanityClient = factory
  client = undefined
}

export function resetSanityClientForTesting() {
  createSanityClient = createClient
  client = undefined
}
