import { Validation } from '@/presentation/protocols'

export const mockValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (email: string): Error {
      return null
    }
  }
  return new ValidationStub()
}
