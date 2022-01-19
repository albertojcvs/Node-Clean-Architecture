import { MissingParamError } from '../errors/missing-param-error'
import { SingUpController } from './singup'

describe('Sing up controller', () => {
  test('should return 400 if no name is provided', () => {
    const sut = new SingUpController()
    const httpRequest = {
      body: {
        email: 'fake@fake.com',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('should return 400 if no email is provided', () => {
    const sut = new SingUpController()
    const httpRequest = {
      body: {
        name: 'fake',
        password: 'password',
        passwordConfirmation: 'password'
      }
    }

    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })
})
