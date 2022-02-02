import { DbAddSurvey } from '@/data/usecases/survey/add-survey/db-add-survey'
import { AddSurvey } from '@/domain/usesCases/survey/add-survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
