export interface SurveyResultModel {
  surveyId: string
  accountId: string
  answers: SurveyResultAnserwModel[]
  date: Date
}

interface SurveyResultAnserwModel {
  image?: string
  answer: string
  count: number
  percent: number
}
