import request from 'supertest'
import { app } from '../config/app'
describe('Singup routes', () => {
  test('Should return an account on success', async () => {
    await request(app).post('/api/signup').send({
      name: 'Alberto',
      email: 'albertojcvs@gmail.com',
      password: '1234',
      passowordConfirmation: '1234'
    }).expect(200)
  })
})
