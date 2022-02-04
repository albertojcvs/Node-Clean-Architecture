import { DbSaveSurveyResult } from '@/data/usecases/survey-reuslt/save-survey-result/db-save-survey-result'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-repository'

export const makeDbSaveSurveyResult = (): DbSaveSurveyResult => {
  const surveResultMongoRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult(surveResultMongoRepository, surveResultMongoRepository)
}
