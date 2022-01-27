import { LogErrorRepository } from '../../../../presentation/helpers/validation/log-error'
import { MongoHelper } from '../helpers/mongo-helper'
export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({ stack, date: new Date() })
  }
}
