import { DbAddAccount } from '@/data/usecases/account/add-account/db-add-account'
import { AddAccount } from '@/domain/usesCases/account/add-account'
import { BcryptAdapter } from '@/infra/criptography/bcrypt-adpter/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-repository'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcrypterAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcrypterAdapter, accountMongoRepository, accountMongoRepository)
}
