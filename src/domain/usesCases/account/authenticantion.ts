import { AuthenticationModel } from '@/domain/models/authentication'

export interface AuthenticationData{
  email: string
  password: string
}

export interface Authentication {
  auth: (authentication: AuthenticationData) => Promise<AuthenticationModel>
}
