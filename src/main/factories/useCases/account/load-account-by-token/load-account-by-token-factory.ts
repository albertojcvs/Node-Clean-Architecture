import { DbLoadAccountByToken } from '@/data/usecases/account/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '@/infra/criptography/jwt-adapter/jwt-adpter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-repository'
import env from '@/main/config/env'

export const makeLoadAccountByToken = (): DbLoadAccountByToken => {
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdpater = new JwtAdapter(env.jwtSecret)
  return new DbLoadAccountByToken(jwtAdpater, accountMongoRepository)
}
