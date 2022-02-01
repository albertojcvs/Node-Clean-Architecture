import { SurveyResultModel } from '../models/survey-result'

export interface SaveSurveyResultModel{
  suerveyId: string
  accountId: string
  answer: string
  date: Date
}

export interface SaveSurveyResult {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
