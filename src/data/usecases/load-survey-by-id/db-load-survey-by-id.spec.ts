import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id'
import { SurveyModel } from '@/domain/models/survey'
import MockDate from 'mockdate'
import { DbLoadSurveyById } from './db-load-survey-by-id'

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [],
  date: new Date()
})

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveybyIdRepositoryStub: LoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveybyIdRepositoryStub = makeLoadSurveyByIdRepository()
  const sut = new DbLoadSurveyById(loadSurveybyIdRepositoryStub)
  return {
    sut,
    loadSurveybyIdRepositoryStub
  }
}

const makeLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (): Promise<SurveyModel> {
      return await new Promise((resolve) => resolve(makeFakeSurvey()))
    }
  }
  return new LoadSurveyByIdRepositoryStub()
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
    expect(survey).toEqual(makeFakeSurvey())
  })
  test('Should throw if LoadSurveyByIdRepository ', async () => {
    const { sut, loadSurveybyIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveybyIdRepositoryStub, 'loadById').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.load('any_id')
    await expect(promise).rejects.toThrow()
  })
})
