import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongofb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongofb/log-repository/log'
import { SingUpController } from '../../presentation/controllers/singup/singup'
import { ValidationComposite } from '../../presentation/helpers/validation/validation-composite'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator'
import { LogControllerDecorator } from '../decorators/log'
import { makeSingUpValidation } from './signup-validation'

export const makeSingUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcrypterAdapter = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcrypterAdapter, addAccountRepository)
  const validationComposite = makeSingUpValidation()
  const singUpController = new SingUpController(emailValidatorAdapter, dbAddAccount, validationComposite)
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(singUpController, logMongoRepository)
}
