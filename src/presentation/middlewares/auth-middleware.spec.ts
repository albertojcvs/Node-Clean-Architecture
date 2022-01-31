import { AccountModel } from '../../domain/models/AccountModel'
import { LoadAccountByToken } from '../../domain/usesCases/load-account-by-access-token'
import { AccessDeniedError } from '../errors/access-denied-error'
import { forbiden } from '../helpers/http/http-helper'
import { AuthMiddleware } from './auth-middleware'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load (token: string, role?: string): Promise<AccountModel> {
        return await new Promise((resolve) => resolve(makeFakeAccount()))
      }
    }

    const sut = new AuthMiddleware(new LoadAccountByTokenStub())
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbiden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load (token: string, role?: string): Promise<AccountModel> {
        return await new Promise((resolve) => resolve(makeFakeAccount()))
      }
    }
    const loadAccountByTokenStub = new LoadAccountByTokenStub()
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle({
      headers: {
        'x-access-token': 'any_token'
      }
    })

    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })
})
