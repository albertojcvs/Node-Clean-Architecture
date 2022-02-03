import { LoadSurveyByIdRepository } from './db-load-survey-by-id-protocols'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import MockDate from 'mockdate'
import { mockLoadSurveyByIdRepository } from '@/data/tests'
import { mockSurvey } from '@/domain/tests'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveybyIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveybyIdRepositoryStub = mockLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveybyIdRepositoryStub)
  return {
    sut,
    loadSurveybyIdRepositoryStub
  }
}

describe('', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyByIdRepository with correct id', async () => {
    const { sut, loadSurveybyIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveybyIdRepositoryStub, 'loadById')
    await sut.load('any_id')
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return an survey on success', async () => {
    const { sut } = makeSut()
    const survey = await sut.load('any_id')
    expect(survey).toEqual(mockSurvey())
  })
  test('Should throw if LoadSurveyByIdRepository ', async () => {
    const { sut, loadSurveybyIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveybyIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_id')
    await expect(promise).rejects.toThrow()
  })
})
