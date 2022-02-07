import { AccountModel } from '@/domain/models/account'
import { AddAccountModel } from '@/domain/usesCases/account/add-account'
import { AuthenticationData } from '@/domain/usesCases/account/authenticantion'
import { AuthenticationModel } from '@/domain/models/authentication'

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

export const mockAuthenticationData = (): AuthenticationData => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAuthenticationModel = (): AuthenticationModel => ({
  accessToken: 'any_token',
  name: 'any_name'
})
