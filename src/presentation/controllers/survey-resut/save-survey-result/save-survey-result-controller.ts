import { SaveSurveyResult } from '@/domain/usesCases/survey-result/save-survey-result'
import { serverError } from '@/presentation/helpers/http/http-helper'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../login/login/login-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly saveSurveyResult: SaveSurveyResult) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.saveSurveyResult.save(httpRequest.body)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
