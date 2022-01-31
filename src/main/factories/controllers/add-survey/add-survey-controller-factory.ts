import { Controller } from '../../../../presentation/protocols/controller'
import { AddSurveyController } from '../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeAddSurveyValidation } from './add-sruvey-validation-factory'
import { makeDbAddSurvey } from '../../useCases/add-survey/db-add-survey-factory'

export const makeAddSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(controller)
}
