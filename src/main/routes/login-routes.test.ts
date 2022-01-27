import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongofb/helpers/mongo-helper'
import { app } from '../config/app'
describe('Login routes', () => {
  let accountsCollection: Collection
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountsCollection = await MongoHelper.getCollection('accounts')
    await accountsCollection.deleteMany({})
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

  describe('POST /login', () => {
    test('Should retun 200 on login', async () => {
      const password = await hash('1234', 12)
      await accountsCollection.insertOne({
        name: 'Alberto',
        email: 'albertojcvs@gmail.com',
        password
      })
      await request(app).post('/api/login').send({
        email: 'albertojcvs@gmail.com',
        password: '1234'
      }).expect(200)
    })

    test('Should retun 401 on login on fails', async () => {
      await request(app).post('/api/login').send({
        email: 'albertojcvs@gmail.com',
        password: '1234'
      }).expect(401)
    })
  })
})
