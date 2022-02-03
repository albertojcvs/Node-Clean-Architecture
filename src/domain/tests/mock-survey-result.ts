import { SurveyResultModel } from '../models/survey-result'
import { SaveSurveyResultModel } from '../usesCases/survey-result/save-survey-result'

export const mockSurveyResult = (): SurveyResultModel => ({
  id: 'any',
  accountId: 'any',
  suerveyId: 'any',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultData = (): SaveSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer_1',
  date: new Date()
})
