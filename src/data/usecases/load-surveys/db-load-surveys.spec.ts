import { SurveyModel } from '../../../domain/models/SurveyModel'
import { LoadSurveysRepository } from '../../protocols/db/survey/load-surveys-repository'
import { DbLoadSurveys } from './db-load-surveys'
const makeFakeSurveys = (): SurveyModel[] => [
  {
    id: 'any_id',
    question: 'any_question',
    answers: [],
    date: new Date()
  },
  {
    id: 'any_id',
    question: 'any_question',
    answers: [],
    date: new Date()
  }
]

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveyRepository', async () => {
    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
      async loadAll (): Promise<SurveyModel[]> {
        return await new Promise(resolve => resolve(makeFakeSurveys()))
      }
    }
    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub()
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })
})
