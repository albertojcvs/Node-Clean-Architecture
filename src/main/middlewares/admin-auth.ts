import { adaptMiddleware } from '../adapters/express/express-middleware-adpater'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
