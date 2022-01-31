import { Decrypter } from '../../protocols/criptography/decrypter'
import { LoadAccountByTokenRepository } from '../../protocols/db/account/load-account-by-token-repository'
import { AccountModel } from '../add-account/db-add-account-protocols'
import { DbLoadAccountByToken } from './db-load-account-by-token'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return await new Promise((resolve) => resolve('any_token'))
    }
  }
  return new DecrypterStub()
}
const makeLoadAccountBytTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub
  implements LoadAccountByTokenRepository {
    async loadByToken (token: string): Promise<AccountModel> {
      return await new Promise((resolve) => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  laodAccountByTokenRepositoryStub: LoadAccountByTokenRepository
}

const makeSut = (): SutTypes => {
  const laodAccountByTokenRepositoryStub = makeLoadAccountBytTokenRepository()
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(
    decrypterStub,
    laodAccountByTokenRepositoryStub
  )

  return {
    sut,
    decrypterStub,
    laodAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken UseCase', () => {
  test('Should call Decrypter with correct value', async () => {
    const { sut, decrypterStub } = makeSut()

    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null id Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, laodAccountByTokenRepositoryStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(
      laodAccountByTokenRepositoryStub,
      'loadByToken'
    )
    await sut.load('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, laodAccountByTokenRepositoryStub } = makeSut()
    jest
      .spyOn(laodAccountByTokenRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)))
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })
  test('Should return an account on success ', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(makeFakeAccount())
  })

  test('Should throws if Dcrypter throws ', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })

  test('Should throws if LoadAccountByTokenRepository throws ', async () => {
    const { sut, laodAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(laodAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow()
  })
})
