import { DbAuthentication } from './db-authentication'
import { AuthenticationModel } from '../../../domain/usesCases/authenticantion'
import { AccountModel, UpdateTokenRepository, LoadAccountByEmailRepository, Encrypter, HashCompare } from './db-authentication-protocols'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeFakeAtuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeLoadAccountByEmailRepostory = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}
const makeHashCompare = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return true
    }
  }
  return new HashCompareStub()
}
const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return 'any_token'
    }
  }

  return new EncrypterStub()
}

const makeUpdateTokenRepository = (): UpdateTokenRepository => {
  class UpdateTokenRepositoryStub implements UpdateTokenRepository {
    async update (token: string): Promise<void> {
      await new Promise(resolve => resolve(''))
    }
  }

  return new UpdateTokenRepositoryStub()
}

interface SutType{
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashCompareStub: HashCompare
  encrypterStub: Encrypter
  updateTokenRepositoryStub: UpdateTokenRepository
}

const makeSut = (): SutType => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepostory()
  const hashCompareStub = makeHashCompare()
  const encrypterStub = makeEncrypter()
  const updateTokenRepositoryStub = makeUpdateTokenRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashCompareStub, encrypterStub, updateTokenRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    encrypterStub,
    updateTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccoutnByEmailREpository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth(makeFakeAtuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throws when LoadAccoutnByEmailREpository throw', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAtuthentication())
    await expect(promise).rejects.toThrow()
  })
  test('Should return null if LoadAccoutnByEmailREpository return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(null)
    const token = await sut.auth(makeFakeAtuthentication())
    expect(token).toBeNull()
  })

  test('Should call HashCompare with correct password', async () => {
    const { sut, hashCompareStub } = makeSut()
    const hashSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth(makeFakeAtuthentication())
    expect(hashSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throws if HashCompare throw', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAtuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashCompare return false', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const token = await sut.auth(makeFakeAtuthentication())
    expect(token).toBeNull()
  })

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(makeFakeAtuthentication())
    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth(makeFakeAtuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a token on success', async () => {
    const { sut } = makeSut()

    const token = await sut.auth(makeFakeAtuthentication())
    expect(token).toBe('any_token')
  })

  test('Should call UpdateTokenReposrioty with correct  token', async () => {
    const { sut, updateTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateTokenRepositoryStub, 'update')
    await sut.auth(makeFakeAtuthentication())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })
})
