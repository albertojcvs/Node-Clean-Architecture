import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyModel } from '@/domain/usesCases/survey/add-survey'

export const mockSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{ answer: 'any_answer_1' }, { answer: 'any_answer_2' }],
  date: new Date()
})

export const mockSurveys = (): SurveyModel[] => [
  {
    id: 'any_id',
    question: 'any_question_1',
    answers: [{ answer: 'any_answer_1' }, { answer: 'any_answer_2' }],
    date: new Date()
  },
  {
    id: 'any_id',
    question: 'any_question_2',
    answers: [{ answer: 'any_answer_1' }, { answer: 'any_answer_2' }],
    date: new Date()
  }
]

export const mockSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ],
  date: new Date()
})
