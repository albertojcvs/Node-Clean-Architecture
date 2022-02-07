import {
  AddAccount,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation,
  Authentication
} from './singup-controller-protocols'
import { badRequest, forbiden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { EmailInUseError } from '@/presentation/errors'

export class SingUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({ name, email, password })
      if (!account) return forbiden(new EmailInUseError())
      const authData = await this.authentication.auth({ email, password })
      return ok(authData)
    } catch (error) {
      return serverError(error)
    }
  }
}
