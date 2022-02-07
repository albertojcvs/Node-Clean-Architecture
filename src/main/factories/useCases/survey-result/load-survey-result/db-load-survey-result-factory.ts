import { DbLoadSurveyResult } from '@/data/usecases/survey-reuslt/load-survey-result/db-load-survey-result'
import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-repository'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-repository'

export const makeDbLoadSurveyResult = (): DbLoadSurveyResult => {
  const surveResultMongoRepository = new SurveyResultMongoRepository()
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveyResult(surveResultMongoRepository, surveyMongoRepository)
}
