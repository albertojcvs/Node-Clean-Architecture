import { RequiredFieldValidation } from '../../presentation/helpers/validation/required-field-validation'
import { Validation } from '../../presentation/helpers/validation/validation'
import { ValidationComposite } from '../../presentation/helpers/validation/validation-composite'

export const makeSingUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
