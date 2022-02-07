import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Authentication, Validation } from './login-controller-protocols'

export class LoginController implements Controller {
  constructor (private readonly authetication: Authentication, private readonly validation: Validation) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const authData = await this.authetication.auth({ email, password })
      if (!authData) return unauthorized()
      return ok(authData)
    } catch (error) {
      return serverError(error)
    }
  }
}
