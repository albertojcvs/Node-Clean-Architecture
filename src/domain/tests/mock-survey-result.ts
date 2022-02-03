import { SurveyResultModel } from '../models/survey-result'
import { SaveSurveyResultModel } from '../usesCases/survey-result/save-survey-result'

export const mockSurveyResult = (): SurveyResultModel => ({
  accountId: 'any',
  surveyId: 'any',
  answers: [
    { answer: 'any_answer', count: 1, percent: 50 },
    {
      answer: 'other_answer',
      count: 1,
      percent: 50
    }
  ],
  date: new Date()
})

export const mockSurveyResultData = (): SaveSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer_1',
  date: new Date()
})
