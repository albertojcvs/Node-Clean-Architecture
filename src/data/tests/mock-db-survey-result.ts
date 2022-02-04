import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResult } from '@/domain/tests/mock-survey-result'
import { SaveSurveyResultModel } from '@/domain/usesCases/survey-result/save-survey-result'
import { LoadSurveyResultRepository } from '../protocols/db/survey-result/load-survey-result-repository'
import { SaveSurveyResultRepository } from '../protocols/db/survey-result/save-survey-result-repository'

export const mockSaveSurveyResuultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async save (data: SaveSurveyResultModel): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new SaveSurveyResultRepositoryStub()
}
export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResult())
    }
  }
  return new LoadSurveyResultRepositoryStub()
}
