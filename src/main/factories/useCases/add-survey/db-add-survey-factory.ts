import { DbAddSurvey } from '../../../../data/usecases/add-survey/db-add-survey'
import { AddSurvey } from '../../../../domain/usesCases/add-survey'
import { SurveyMongoRepository } from '../../../../infra/db/mongofb/survey/survey-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository()
  return new DbAddSurvey(surveyMongoRepository)
}
