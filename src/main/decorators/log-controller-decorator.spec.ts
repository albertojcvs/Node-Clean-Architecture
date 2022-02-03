import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { mockLogErrorRepository } from '@/data/tests'
import { mockAccount } from '@/domain/tests'
import { ok, serverError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from './log-controller-decorator'

type SutTypes = {
  controllerStub: Controller
  sut: LogControllerDecorator
  logErrorRepository: LogErrorRepository
}

const mockRequest = (): HttpRequest => ({
  body: {
    name: 'fake',
    email: 'fake@fake.com',
    password: 'password',
    passwordConfirmation: 'password'
  }
})

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makeController = (): Controller => {
  class ControlerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return await new Promise(resolve => { resolve(ok(mockAccount())) })
    }
  }
  return new ControlerStub()
}

const makeSut = (): SutTypes => {
  const logErrorRepository = mockLogErrorRepository()
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepository)

  return {
    sut,
    controllerStub,
    logErrorRepository
  }
}

describe('LogControllerDecorator', () => {
  test('Should call controller handler', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')

    await sut.handle({
      body: {
        name: 'Alberto'
      }
    })

    expect(handleSpy).toHaveBeenCalledWith({
      body: {
        name: 'Alberto'
      }
    })
  })
  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(ok(mockAccount()))
  })
  test('Should call LogErrorRepository with correct error if controller error return an server error', async () => {
    const { sut, controllerStub, logErrorRepository } = makeSut()

    const logSpy = jest.spyOn(logErrorRepository, 'logError')

    const error = mockServerError()
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise((resolve) => resolve(error)))
    await sut.handle(mockRequest())
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
