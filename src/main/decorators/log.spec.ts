import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

describe('LogControllerDecorator', () => {
  test('Should call controller handler', async () => {
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
    const controlerStub = new ControlerStub()
    const sut = new LogControllerDecorator(controlerStub)
    const handleSpy = jest.spyOn(controlerStub, 'handle')

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
})
