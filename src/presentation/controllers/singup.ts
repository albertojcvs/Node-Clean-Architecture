import { AddAccount } from '../../domain/usesCases/add-account'
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller, HttpRequest, EmailValidator, HttpResponse } from '../protocols'

export class SingUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator, private readonly addAccount: AddAccount) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) return badRequest(new InvalidParamError('passwordConfirmation'))

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) return badRequest(new InvalidParamError('email'))

      this.addAccount.add({ name, email, password })
    } catch (error) {
      return serverError()
    }
  }
}
