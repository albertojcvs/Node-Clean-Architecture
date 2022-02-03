import { DbSaveSurveyResult } from './db-save-survey-result'

import MockDate from 'mockdate'
import { SaveSurveyResultRepository } from './db-save-survey-result-protocols'
import { mockSurveyResult, mockSurveyResultData } from '@/domain/tests'
import { mockSaveSurveyResult } from '@/data/tests'

type SutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository

}
const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResult()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

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
    const fakeSurveyResultData = mockSurveyResultData()
    await sut.save(fakeSurveyResultData)

    expect(saveSpy).toHaveBeenCalledWith(fakeSurveyResultData)
  })

  test('Should throws if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValueOnce(new Error())
    const promisse = sut.save(mockSurveyResultData())

    await expect(promisse).rejects.toThrow()
  })

  test('Should returns a survey result on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.save(mockSurveyResultData())
    expect(surveyResult).toEqual(mockSurveyResult())
  })
})
