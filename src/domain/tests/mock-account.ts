import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usesCases/account/add-account'
import { AuthenticationModel } from '@/domain/usesCases/account/authenticantion'

export const mockAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAddAccountData = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

export const mockAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})
