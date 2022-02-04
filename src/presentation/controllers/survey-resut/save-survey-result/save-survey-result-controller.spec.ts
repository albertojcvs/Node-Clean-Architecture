import {
  HttpRequest,
  LoadSurveyById,
  SaveSurveyResult
} from './save-survey-result-controller-protocols'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { forbiden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'
import { InvalidParamError } from '@/presentation/errors'
import { mockSurveyResult, mockSurveyResultData } from '@/domain/tests'
import { mockLoadSurveyById, mockSaveSurveyResult } from '@/presentation/tests'

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
  saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const saveSurveyResultStub = mockSaveSurveyResult()
  const sut = new SaveSurveyResultController(
    loadSurveyByIdStub,
    saveSurveyResultStub
  )
  return {
    sut,
    loadSurveyByIdStub,
    saveSurveyResultStub
  }
}

const mockRequest = (): HttpRequest => ({
  body: {
    answer: 'any_answer_1'
  },
  params: {
    surveyId: 'any_survey_id'
  },
  accountId: 'any_account_id'
})
describe('SaveSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('Shoudl call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyByIdStub, 'load')
    await sut.handle(mockRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Shoudl return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'load').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbiden(new InvalidParamError('surveyId')))
  })

  test('Shoudl return 403 if an invalid answer is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      params: {
        surveyId: 'any_survey_id'
      },
      body: {
        answer: 'wrong_answer'
      }
    })
    expect(httpResponse).toEqual(forbiden(new InvalidParamError('answer')))
  })

  test('Shoudl call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    const fakeSurveyResultData = mockSurveyResultData()
    await sut.handle(mockRequest())
    expect(saveSpy).toHaveBeenCalledWith(fakeSurveyResultData)
  })

  test('Shoudl return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Shoudl return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Shoudl return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(mockSurveyResult()))
  })
})
