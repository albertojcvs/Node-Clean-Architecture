import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adpter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongofb/account/account-repository'
import { LogMongoRepository } from '../../../infra/db/mongofb/log/log-repository'
import { SingUpController } from '../../../presentation/controllers/singup/signup-controller'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeSingUpValidation } from './signup-validation-factory'

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
