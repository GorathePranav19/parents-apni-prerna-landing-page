import crypto from 'node:crypto'

import { env } from '../config/env.js'
import { HttpError } from '../utils/http-error.js'

function secureCompare(left, right) {
  const a = Buffer.from(String(left || ''), 'utf8')
  const b = Buffer.from(String(right || ''), 'utf8')

  if (a.length !== b.length) {
    return false
  }

  return crypto.timingSafeEqual(a, b)
}

function readApiKey(req) {
  const keyHeader = req.get('x-api-key')
  if (keyHeader) {
    return keyHeader.trim()
  }

  const authHeader = req.get('authorization') || ''
  if (authHeader.toLowerCase().startsWith('bearer ')) {
    return authHeader.slice(7).trim()
  }

  return ''
}

export function hasValidApiKey(req) {
  const candidate = readApiKey(req)
  if (!candidate) {
    return false
  }

  return secureCompare(candidate, env.privateApiKey)
}

export function requireApiKey(req, _res, next) {
  if (!hasValidApiKey(req)) {
    return next(new HttpError(401, 'Unauthorized. Valid API key is required.'))
  }

  return next()
}
