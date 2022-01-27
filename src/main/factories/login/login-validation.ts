import { EmailValidation } from '../../../presentation/helpers/validation/email-validation'
import { RequiredFieldValidation } from '../../../presentation/helpers/validation/required-field-validation'
import { Validation } from '../../../presentation/helpers/validation/validation'
import { ValidationComposite } from '../../../presentation/helpers/validation/validation-composite'
import { EmailValidatorAdapter } from '../../../utils/email-validator'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
