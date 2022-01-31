import { AuthMiddleware } from '../../../presentation/middlewares/auth-middleware'
import { makeLoadAccountByToken } from '../useCases/load-account-by-token/load-account-by-token-factory'

export const makeAuthMiddleware = (role?: string): AuthMiddleware => {
  return new AuthMiddleware(makeLoadAccountByToken(), role)
}
