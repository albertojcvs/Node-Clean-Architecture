import { Collection } from 'mongodb'
import { MongoHelper } from '../../infra/db/mongofb/helpers/mongo-helper'
import request from 'supertest'
import { app } from '../config/app'
import { sign } from 'jsonwebtoken'
import env from '../config/env'

describe('Survey routes', () => {
  let surveyCollection: Collection
  let accountCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })
  describe('POST /surveys ', () => {
    test('Should return 403 on add survey without a accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'any_questions',
          answers: [
            { image: 'http://teste.com', answer: 'answer 1' },
            { answer: 'answer 2' }
          ]
        })
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'Alberto',
        email: 'albertojcvs@gmail.com',
        password: '123',
        role: 'admin'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({ _id: id }, { $set: { accessToken } })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
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

  describe('GET /surveys ', () => {
    test('Should return 403 on load surveys without a accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .send({
          question: 'any_questions',
          answers: [
            { image: 'http://teste.com', answer: 'answer 1' },
            { answer: 'answer 2' }
          ]
        })
        .expect(403)
    })
  })
})
