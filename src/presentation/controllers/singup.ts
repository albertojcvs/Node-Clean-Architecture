import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helper'
import { Controller, HttpRequest, EmailValidator, HttpResponse } from '../protocols'

export class SingUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field))
      }

      const { name, email, password, passwordConfimation } = httpRequest.body

      if (password !== passwordConfimation) return badRequest(new InvalidParamError('passwordConfimation'))

      const isValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isValid) return badRequest(new InvalidParamError('email'))
    } catch (error) {
      return serverError()
    }
  }
}
