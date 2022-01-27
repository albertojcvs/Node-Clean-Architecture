import { EmailValidation } from '../../../presentation/helpers/validation/email-validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validation/required-field-validation'
import { Validation } from '../../../presentation/helpers/validation/validation'
import { ValidationComposite } from '../../../presentation/helpers/validation/validation-composite'
import { EmailValidator } from '../../../presentation/protocols'
import { makeLoginValidation } from './login-validation'

jest.mock('../../../presentation/helpers/validation/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): Boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignUp Validation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
