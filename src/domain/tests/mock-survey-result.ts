import { SurveyResultModel } from '../models/survey-result'
import { SaveSurveyResultModel } from '../usesCases/survey-result/save-survey-result'

export const mockSurveyResult = (): SurveyResultModel => ({
  question: 'any_question',
  surveyId: 'any_id',
  answers: [
    { answer: 'any_answer', count: 0, percent: 0 },
    {
      answer: 'other_answer',
      count: 0,
      percent: 0
    }
  ],
  date: new Date()
})

export const mockSurveyResultData = (): SaveSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})
