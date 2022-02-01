import { SurveyModel } from '../../../domain/models/SurveyModel'
import { LoadSurveys } from '../../../domain/usesCases/load-surveys'
import { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}
  async load (): Promise<SurveyModel[]> {
    await this.loadSurveysRepository.loadAll()
    return null
  }
}
