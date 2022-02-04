import { SaveSurveyResultModel } from '@/domain/usesCases/survey-result/save-survey-result'

export interface SaveSurveyResultRepository {
  save: (data: SaveSurveyResultModel) => Promise<void>
}
