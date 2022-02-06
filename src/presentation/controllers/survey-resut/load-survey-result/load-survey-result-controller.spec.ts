import { serverError } from '@/presentation/helpers/http/http-helper'
import { mockLoadSurveyById } from '@/presentation/tests'
import { LoadSurveyResultController } from './load-survey-result-controller'
import { HttpRequest, LoadSurveyById } from './load-survey-result-controller-protocols'

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub)
  return {
    sut,
    loadSurveyByIdStub
  }
}
const mockRequest = (): HttpRequest => ({
  body: {
    surveyId: 'any_id'
  }
})
describe('LoadSurveyResult Controller', () => {
  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveyByIdStub, 'load')

    await sut.handle(mockRequest())

    expect(loadSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())

    await expect(httpResponse).toEqual(serverError(new Error()))
  })
})