import { SingUpController } from '@/presentation/controllers/login/singup/signup-controller'
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddAccount } from '@/main/factories/useCases/account/add-account/db-add-account-factory'
import { makeDbAuthentication } from '@/main/factories/useCases/account/authentication/db-authentication-factory'
import { makeSingUpValidation } from './signup-validation-factory'

export const makeSingUpController = (): Controller => {
  const controller = new SingUpController(makeDbAddAccount(), makeSingUpValidation(), makeDbAuthentication())
  return makeLogControllerDecorator(controller)
}
