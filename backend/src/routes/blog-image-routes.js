import { Router } from 'express'
import multer from 'multer'

import { requireApiKey } from '../middleware/auth.js'
import { asyncHandler } from '../utils/async-handler.js'
import { HttpError } from '../utils/http-error.js'
import { uploadImageToSanity } from '../services/sanity-image-service.js'

const router = Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
})

router.post(
  '/',
  requireApiKey,
  upload.single('image'),
  asyncHandler(async (req, res) => {
    if (!req.file) {
      throw new HttpError(400, 'Image file is required. Send multipart/form-data with field `image`.')
    }

    const alt = String(req.body.alt || 'image').trim() || 'image'
    const image = await uploadImageToSanity(req.file)

    res.status(201).json({
      success: true,
      data: {
        ...image,
        markdown: `![${alt}](${image.url})`,
      },
    })
  }),
)

export default router
