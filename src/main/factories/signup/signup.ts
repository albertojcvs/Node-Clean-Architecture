import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongofb/account-repository/account'
import { LogMongoRepository } from '../../../infra/db/mongofb/log-repository/log'
import { SingUpController } from '../../../presentation/controllers/singup/signup'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { makeSingUpValidation } from './signup-validation'

export const makeSingUpController = (): Controller => {
  const salt = 12
  const bcrypterAdapter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcrypterAdapter, addAccountRepository)
  const validationComposite = makeSingUpValidation()
  const singUpController = new SingUpController(dbAddAccount, validationComposite)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(singUpController, logMongoRepository)
}
