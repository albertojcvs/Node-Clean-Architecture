import { Authentication, AuthenticationModel } from '../../../domain/usesCases/authenticantion'
import { UpdateTokenRepository, LoadAccountByEmailRepository, Encrypter, HashCompare } from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashCompare: HashCompare,
    private readonly encrypter: Encrypter,
    private readonly updateTokenRepository: UpdateTokenRepository) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email)
    if (account) {
      const isValid = await this.hashCompare.compare(authentication.password, account.password)
      if (isValid) {
        const token = await this.encrypter.encrypt(account.id)
        await this.updateTokenRepository.updateToken(account.id, token)
        return token
      }
    }
    return null
  }
}
