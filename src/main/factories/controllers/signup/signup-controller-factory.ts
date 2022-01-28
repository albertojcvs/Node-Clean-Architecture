import { SingUpController } from '../../../../presentation/controllers/singup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '../../useCases/add-account/db-add-account-factory'
import { makeDbAuthentication } from '../../useCases/authentication/db-authentication-factory'
import { makeSingUpValidation } from './signup-validation-factory'

export const makeSingUpController = (): Controller => {
  const controller = new SingUpController(makeDbAddAccount(), makeSingUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}