import { AddSurveyModel } from '@/domain/usesCases/survey/add-survey'

export interface AddSurveyRepository {
  add: (data: AddSurveyModel) => Promise<void>
}
