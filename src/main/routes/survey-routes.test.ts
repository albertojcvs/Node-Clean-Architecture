import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongofb/helpers/mongo-helper'
import request from 'supertest'
import { app } from '../config/app'

describe('Survey routes', () => {
  let surveyCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })
  describe('POST /surveys ', () => {
    test('Should return 204 on add survey success ', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'any_questions',
          answers: [
            { image: 'http://teste.com', answer: 'answer 1' },
            { answer: 'answer 2' }
          ]
        })
        .expect(204)
    })
  })
})
