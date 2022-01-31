import { AccessDeniedError } from '../errors/access-denied-error'
import { forbiden } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../protocols'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbiden(new AccessDeniedError())
    return await new Promise(resolve => resolve(error))
  }
}
