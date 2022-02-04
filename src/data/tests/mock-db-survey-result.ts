import { SaveSurveyResult } from '@/data/usecases/survey-reuslt/save-survey-result/db-save-survey-result-protocols'
import { SurveyResultModel } from '@/domain/models/survey-result'
import { mockSurveyResult } from '@/domain/tests/mock-survey-result'
import { SaveSurveyResultModel } from '@/domain/usesCases/survey-result/save-survey-result'
import { LoadSurveyResultRepository } from '../protocols/db/survey-result/load-survey-result-repository'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return await new Promise((resolve) => resolve(mockSurveyResult()))
    }
  }
  return new SaveSurveyResultStub()
}

export const mockLoadSurveyResultRepository = (): LoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements LoadSurveyResultRepository {
    async loadBySurveyId (): Promise<SurveyResultModel> {
      return await Promise.resolve(mockSurveyResult())
    }
  }
  return new LoadSurveyResultRepositoryStub()
}
