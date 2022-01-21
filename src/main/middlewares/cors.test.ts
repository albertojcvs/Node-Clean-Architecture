import request from 'supertest'
import { app } from '../config/app'
describe('CORS Middleware', () => {
  test('Should parse body as json', async () => {
    app.get('/test_cors', (request, response) => {
      response.send()
    })
    await request(app).get('/test_cors').send().expect('access-control-allow-origin', '*')
    await request(app).get('/test_cors').send().expect('access-control-allow-headers', '*')
    await request(app).get('/test_cors').send().expect('access-control-allow-methods', '*')
  })
})
