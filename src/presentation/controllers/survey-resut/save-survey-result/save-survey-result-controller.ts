import { Controller, HttpRequest, HttpResponse, LoadSurveyById, SaveSurveyResult } from './save-survey-result-controller-protocols'
import { forbiden, serverError } from '@/presentation/helpers/http/http-helper'
import { InvalidParamError } from '@/presentation/errors'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById, private readonly saveSurveyResult: SaveSurveyResult) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { accountId, date, answer } = httpRequest.body
      const survey = await this.loadSurveyById.load(surveyId)
      if (!survey) return forbiden(new InvalidParamError('surveyId'))
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
