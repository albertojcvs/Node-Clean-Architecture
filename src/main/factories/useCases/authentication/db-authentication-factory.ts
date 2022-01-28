import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { Authentication } from '../../../../domain/usesCases/authenticantion'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adpter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adpter'
import { AccountMongoRepository } from '../../../../infra/db/mongofb/account/account-repository'
import env from '../../../config/env'
export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcrypterAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)

  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(
    accountMongoRepository,
    bcrypterAdapter,
    jwtAdapter,
    accountMongoRepository
  )
}