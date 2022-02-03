import { mockSurvey, mockSurveys } from '@/domain/tests'
import { SurveyModel } from '@/domain/models/survey'
import { LoadSurveys } from '@/domain/usesCases/survey/load-surveys'
import { AddSurvey, AddSurveyModel } from '@/domain/usesCases/survey/add-survey'
import { LoadSurveyById } from '@/presentation/controllers/survey-resut/save-survey-result/save-survey-result-controller-protocols'

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return await new Promise((resolve) => resolve(mockSurveys()))
    }
  }
  return new LoadSurveysStub()
}

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (data: AddSurveyModel): Promise<void> {
      return null
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async load (id: string): Promise<SurveyModel> {
      return await new Promise((resolve) => resolve(mockSurvey()))
    }
  }
  return new LoadSurveyByIdStub()
}
