import { AddSurveyModel } from '@/domain/usesCases/add-survey'

export interface AddSurveyRepository {
  add: (data: AddSurveyModel) => Promise<void>
}
