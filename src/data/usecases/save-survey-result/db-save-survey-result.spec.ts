import { DbSaveSurveyResult } from './db-save-survey-result'
import {
  SaveSurveyResultRepository,
  SurveyResultModel,
  SaveSurveyResultModel
} from './db-save-survey-result-protocols'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository

}
const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResuultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

const makeSaveSurveyResuultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return await new Promise((resolve) => resolve(makeFakeSurveyResult()))
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

const makeFakeSurveyResult = (): SurveyResultModel => ({
  id: 'any',
  accountId: 'any',
  suerveyId: 'any',
  answer: 'any',
  date: new Date()
})

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  accountId: 'any',
  suerveyId: 'any',
  answer: 'any',
  date: new Date()
})
describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const fakeSurveyResultData = makeFakeSurveyResultData()
    await sut.save(fakeSurveyResultData)

    expect(saveSpy).toHaveBeenCalledWith(fakeSurveyResultData)
  })

  test('Should throws if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValueOnce(new Error())
    const promisse = sut.save(makeFakeSurveyResultData())

    await expect(promisse).rejects.toThrow()
  })
})
