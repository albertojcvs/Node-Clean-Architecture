import { LoadSurveyResultRepository } from '../load-survey-result/db-load-survey-result-protocols'
import {
  SaveSurveyResultRepository,
  SurveyResultModel,
  SaveSurveyResult,
  SaveSurveyResultModel
} from './db-save-survey-result-protocols'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRespository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRespository: LoadSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRespository.save(data)
    const surveyResult = await this.loadSurveyResultRespository.loadBySurveyId(data.surveyId)
    return surveyResult
  }
}
