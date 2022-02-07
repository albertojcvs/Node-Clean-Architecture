import { ok, serverError, unauthorized } from '../../../helpers/http/http-helper'
import { HttpRequest, Authentication, Validation } from './login-controller-protocols'
import { LoginController } from './login-controller'
import { mockAuthentication, mockValidation } from '@/presentation/tests'
import { mockAuthenticationModel } from '@/domain/tests'

type SutTypes = {
  sut: LoginController
  authenticationStub: Authentication
  validationStub: Validation
}
const makeSut = (): SutTypes => {
  const authenticationStub = mockAuthentication()
  const validationStub = mockValidation()
  const sut = new LoginController(authenticationStub, validationStub)

  return {
    sut,
    authenticationStub,
    validationStub
  }
}

const mockFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

describe('Login controller', () => {
  test('Shoul return 500 if Authentication throws an error', async () => {
    const { sut, authenticationStub } = makeSut()

    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Shoulf call authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()

    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(mockFakeRequest())
    expect(authSpy).toHaveBeenCalledWith({ email: 'any_email@mail.com', password: 'any_password' })
  })

  test('Shoulf return 401 if invalid crendentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()

    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Shoulf return 200 if valid crendentials are provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockFakeRequest())
    expect(httpResponse).toEqual(ok(mockAuthenticationModel()))
  })
})
