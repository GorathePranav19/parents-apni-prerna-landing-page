import { Router } from 'express'
import { getBlogBySlug, listBlogs } from '../controllers/blogController.js'

const blogRouter = Router()

blogRouter.get('/', listBlogs)
blogRouter.get('/:slug', getBlogBySlug)

export default blogRouter

