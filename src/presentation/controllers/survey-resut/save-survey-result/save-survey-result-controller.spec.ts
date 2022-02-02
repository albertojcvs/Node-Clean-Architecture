import { SurveyResultModel } from '@/domain/models/survey-result'
import {
  SaveSurveyResult,
  SaveSurveyResultModel
} from '@/domain/usesCases/survey-result/save-survey-result'
import { HttpRequest } from '../../login/login/login-controller-protocols'
import { SaveSurveyResultController } from './save-survey-result-controller'
import MockDate from 'mockdate'
import { serverError } from '@/presentation/helpers/http/http-helper'

type SutTypes = {
  sut: SaveSurveyResultController
  saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const saveSurveyResultStub = makeSaveSurveyResult()
  const sut = new SaveSurveyResultController(saveSurveyResultStub)
  return {
    sut,
    saveSurveyResultStub
  }
}

const makeSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return await new Promise((resolve) => resolve(makeFakeSurveyResult()))
    }
  }
  return new SaveSurveyResultStub()
}

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  accountId: 'any',
  surveyId: 'any',
  answer: 'any',
  date: new Date()
})

const makeFakeSurveyResult = (): SurveyResultModel => ({
  id: 'any',
  accountId: 'any',
  suerveyId: 'any',
  answer: 'any',
  date: new Date()
})

const makeFaKeRequest = (): HttpRequest => ({
  body: {
    accountId: 'any',
    surveyId: 'any',
    answer: 'any',
    date: new Date()
  }
})
describe('SaveSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Shoudl call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    const fakeSurveyResultData = makeFakeSurveyResultData()
    await sut.handle(makeFaKeRequest())
    expect(saveSpy).toHaveBeenCalledWith(fakeSurveyResultData)
  })
  test('Shoudl return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFaKeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
