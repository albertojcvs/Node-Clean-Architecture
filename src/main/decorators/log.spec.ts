import { LogErrorRepository } from '../../data/protocols/log-error'
import { serverError } from '../../presentation/helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

interface SutTypes {
  controllerStub: Controller
  sut: LogControllerDecorator
  logErrorRepository: LogErrorRepository
}

const makeController = (): Controller => {
  class ControlerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: {
          name: 'Alberto'
        }
      }
      return await new Promise(resolve => { resolve(httpResponse) })
    }
  }
  return new ControlerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log (stack: string): Promise<void> {
      return await new Promise((resolve) => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}

const makeSut = (): SutTypes => {
  const logErrorRepository = makeLogErrorRepository()
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

    const httpResponse = await sut.handle({
      body: {
        name: 'Alberto'
      }
    })

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'Alberto'
      }
    })
  })
  test('Should call LogErrorRepository with correct error if controller error return an server error', async () => {
    const { sut, controllerStub, logErrorRepository } = makeSut()

    const logSpy = jest.spyOn(logErrorRepository, 'log')
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise((resolve) => resolve(error)))
    await sut.handle({
      body: {
        name: 'Alberto'
      }
    })
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
