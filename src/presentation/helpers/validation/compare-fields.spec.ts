import { InvalidParamError, MissingParamError } from '../../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldConfirmation')
}

describe('Compare Field Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any_name', fieldConfirmation: 'any' })

    expect(error).toEqual(new InvalidParamError('fieldConfirmation'))
  })
  test('Should not return if validation succeeds ', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any_name', fieldConfirmation: 'any_name' })

    expect(error).toBeFalsy()
  })
})
