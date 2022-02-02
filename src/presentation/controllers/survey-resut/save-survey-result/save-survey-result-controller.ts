import { Controller, HttpRequest, HttpResponse, LoadSurveyById, SaveSurveyResult } from './save-survey-result-controller-protocols'
import { serverError } from '@/presentation/helpers/http/http-helper'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById, private readonly saveSurveyResult: SaveSurveyResult) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { accountId, date, answer } = httpRequest.body
      await this.loadSurveyById.load(surveyId)
      await this.saveSurveyResult.save({
        surveyId,
        accountId,
        answer,
        date
      })
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
