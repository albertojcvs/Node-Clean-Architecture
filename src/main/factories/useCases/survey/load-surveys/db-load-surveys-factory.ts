import { DbLoadSurveys } from '@/data/usecases/survey/load-surveys/db-load-surveys'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-repository'

export const makeDbLoadSurveys = (): DbLoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbLoadSurveys(surveyMongoRepository)
}
