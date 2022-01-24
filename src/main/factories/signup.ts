import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongofb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongofb/log-repository/log'
import { SingUpController } from '../../presentation/controllers/singup/singup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator'
import { LogControllerDecorator } from '../decorators/log'

export const makeSingUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcrypterAdapter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcrypterAdapter, addAccountRepository)
  const singUpController = new SingUpController(emailValidatorAdapter, dbAddAccount)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(singUpController, logMongoRepository)
}
