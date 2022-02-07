import { mockAccount } from '@/domain/tests'
import { AccountModel } from '@/domain/models/account'
import { AddAccount, AddAccountModel } from '@/domain/usesCases/account/add-account'
import { Authentication, AuthenticationData } from '@/domain/usesCases/account/authenticantion'
import { LoadAccountByToken } from '@/presentation/middlewares/auht-middleware-protocols'
import { AuthenticationModel } from '@/domain/models/authentication'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }
      return await new Promise((resolve) => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: AuthenticationData): Promise<AuthenticationModel> {
      return await new Promise(resolve => resolve({
        accessToken: 'any_token',
        name: 'any_name'
      }))
    }
  }
  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (token: string, role?: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(mockAccount()))
    }
  }
  return new LoadAccountByTokenStub()
}
