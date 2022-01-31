import { LoadAccountByToken, HttpRequest, HttpResponse, Middleware } from './auht-middleware-protocols'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbiden, ok, serverError } from '../helpers/http/http-helper'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken, private readonly role?: string) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) return ok({ accountId: account.id })
      }
      return forbiden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
