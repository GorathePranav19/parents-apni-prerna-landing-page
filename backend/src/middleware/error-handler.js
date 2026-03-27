import mongoose from 'mongoose'
import multer from 'multer'

import { isProduction } from '../config/env.js'
import { HttpError } from '../utils/http-error.js'

function toHttpError(err) {
  if (err instanceof HttpError) {
    return err
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.values(err.errors || {}).map((entry) => ({
      field: entry.path,
      message: entry.message,
    }))

    return new HttpError(400, 'Validation failed.', details)
  }

  if (err instanceof mongoose.Error.CastError) {
    return new HttpError(400, `Invalid value for \`${err.path}\`.`)
  }

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return new HttpError(413, 'Uploaded file is too large. Maximum size is 5MB.')
    }

    return new HttpError(400, err.message)
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return new HttpError(400, 'Invalid JSON payload.')
  }

  return new HttpError(500, err?.message || 'Internal Server Error')
}

export function notFoundHandler(req, _res, next) {
  next(new HttpError(404, `Route not found: ${req.method} ${req.originalUrl}`))
}

export function errorHandler(err, _req, res, _next) {
  const normalized = toHttpError(err)

  const payload = {
    success: false,
    error: {
      message: normalized.message,
      ...(normalized.details ? { details: normalized.details } : {}),
      ...(!isProduction() ? { stack: err?.stack } : {}),
    },
  }

  res.status(normalized.statusCode).json(payload)
}
