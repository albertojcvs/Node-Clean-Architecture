import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongofb/helpers/mongo-helper'
import { app } from '../config/app'
describe('Singup routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('account')
    await accountCollection.deleteMany({})
  })
  test('Should return an account on success', async () => {
    await request(app).post('/api/signup').send({
      name: 'Alberto',
      email: 'albertojcvs@gmail.com',
      password: '1234',
      passowordConfirmation: '1234'
    }).expect(200)
  })
})
