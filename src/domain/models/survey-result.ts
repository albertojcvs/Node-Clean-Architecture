export interface SurveyResultModel {
  surveyId: string
  question: string
  answers: SurveyResultAnserwModel[]
  date: Date
}

interface SurveyResultAnserwModel {
  image?: string
  answer: string
  count: number
  percent: number
}
