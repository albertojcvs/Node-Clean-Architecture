import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongofb/helpers/mongo-helper'
import { app } from '../config/app'
describe('Login routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('account')
    await accountCollection.deleteMany({})
  })
  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app).post('/api/signup').send({
        name: 'Alberto',
        email: 'albertojcvs@gmail.com',
        password: '1234',
        passwordConfirmation: '1234'
      }).expect(200)
    })
  })
})
