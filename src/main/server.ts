import { MongoHelper } from '../infra/db/mongofb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl).then(
  async () => {
    const app = (await import('./config/app')).app
    app.listen(3333, () => console.log('Server is running'))
  }
).catch(console.error)
