// import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { app } from '../config/app'
import request from 'supertest'
// import { sign } from 'jsonwebtoken'
// import env from '../config/env'
//
// let surveyCollection: Collection
// let accountCollection: Collection
//
// const makeAccessToken = async (): Promise<string> => {
//   const res = await accountCollection.insertOne({
//     name: 'Alberto',
//     email: 'albertojcvs@gmail.com',
//     password: '123',
//     role: 'admin'
//   })
//   const id = res.ops[0]._id
//   const accessToken = sign({ id }, env.jwtSecret)
//   await accountCollection.updateOne({ _id: id }, { $set: { accessToken } })
//   return accessToken
// }

describe('Survey Results routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  //   beforeEach(async () => {
  //     surveyCollection = await MongoHelper.getCollection('surveys')
  //     await surveyCollection.deleteMany({})
  //     accountCollection = await MongoHelper.getCollection('accounts')
  //     await accountCollection.deleteMany({})
  //   })
  describe('PUT /surveys/:surveyId/results ', () => {
    test('Should return 403 on add survey without a accessToken', async () => {
      await request(app)
        .put('/api/surveys/any/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })
  })
})
