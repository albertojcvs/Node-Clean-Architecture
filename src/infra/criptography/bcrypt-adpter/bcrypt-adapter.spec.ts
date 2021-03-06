import { BcryptAdapter } from './bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => resolve('hash'))
  },
  async compare (): Promise<boolean> {
    return await new Promise(resolve => resolve(true))
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BCrypter adpter', () => {
  describe('hash()', () => {
    test('Should call hash with correct value', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('Should return a valid hash on  hash success', async () => {
      const sut = makeSut()
      const hash = await sut.hash('any_value')
      expect(hash).toBe('hash')
    })

    test('Should throw if hash throws an error', async () => {
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(
        () => {
          throw new Error()
        }
      )
      const sut = makeSut()
      const promisse = sut.hash('any_value')
      await expect(promisse).rejects.toThrow()
    })
  })
  describe('compare()', () => {
    test('Should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('any_value', 'any_hash')
      expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
    })

    test('Should return true when compare success', async () => {
      const sut = makeSut()
      const isValid = await sut.compare('any_value', 'any_passoword')
      expect(isValid).toBeTruthy()
    })
    test('Should return false when compare fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
      const isValid = await sut.compare('any_value', 'any_passoword')
      expect(isValid).toBeFalsy()
    })

    test('Should throw if compare throws an error', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(
        () => {
          throw new Error()
        }
      )
      const sut = makeSut()
      const promisse = sut.compare('any_value', 'any_hash')
      await expect(promisse).rejects.toThrow()
    })
  })
})
