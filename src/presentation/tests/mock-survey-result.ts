import { SaveSurveyResultModel, SaveSurveyResult } from '@/domain/usesCases/survey-result/save-survey-result'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResult } from '@/domain/tests'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResult())
    }
  }
  return new SaveSurveyResultStub()
}
