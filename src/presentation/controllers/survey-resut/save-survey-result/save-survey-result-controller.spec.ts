import {
  HttpRequest,
  LoadSurveyById,
  SaveSurveyResult,
  SaveSurveyResultModel,
  SurveyModel,
  SurveyResultModel
} from './save-survey-result-controller-protocols'
import { SaveSurveyResultController } from './save-survey-result-controller'
import { forbiden, serverError } from '@/presentation/helpers/http/http-helper'
import MockDate from 'mockdate'
import { InvalidParamError } from '@/presentation/errors'

type SutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
  saveSurveyResultStub: SaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById()
  const saveSurveyResultStub = makeSaveSurveyResult()
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

const makeSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return await new Promise((resolve) => resolve(makeFakeSurveyResult()))
    }
  }
  return new SaveSurveyResultStub()
}

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async load (id: string): Promise<SurveyModel> {
      return await new Promise((resolve) => resolve(makeFakeSurvey()))
    }
  }
  return new LoadSurveyByIdStub()
}

const makeFakeSurveyResultData = (): SaveSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any',
  date: new Date()
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{ answer: 'any' }],
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
    accountId: 'any_account_id',
    answer: 'any',
    date: new Date()
  },
  params: {
    surveyId: 'any_survey_id'
  }
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
    await sut.handle(makeFaKeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Shoudl return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'load').mockResolvedValueOnce(null)
    const httpResponse = await sut.handle(makeFaKeRequest())
    expect(httpResponse).toEqual(forbiden(new InvalidParamError('surveyId')))
  })

  test('Shoudl call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultStub, 'save')
    const fakeSurveyResultData = makeFakeSurveyResultData()
    await sut.handle(makeFaKeRequest())
    expect(saveSpy).toHaveBeenCalledWith(fakeSurveyResultData)
  })

  test('Shoudl return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFaKeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Shoudl return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFaKeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
