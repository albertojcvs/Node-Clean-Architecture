import { SaveSurveyResult } from '@/domain/usesCases/survey-result/save-survey-result'
import { Controller, HttpRequest, HttpResponse } from '../../login/login/login-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly saveSurveyResult: SaveSurveyResult) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.saveSurveyResult.save(httpRequest.body)
    return null
  }
}
