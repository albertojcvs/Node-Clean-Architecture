import { DbLoadAccountByToken } from '../../../../data/usecases/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '../../../../infra/criptography/jwt-adapter/jwt-adpter'
import { AccountMongoRepository } from '../../../../infra/db/mongofb/account/account-repository'
import env from '../../../config/env'

export const makeLoadAccountByToken = (): DbLoadAccountByToken => {
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdpater = new JwtAdapter(env.jwtSecret)
  return new DbLoadAccountByToken(jwtAdpater, accountMongoRepository)
}
