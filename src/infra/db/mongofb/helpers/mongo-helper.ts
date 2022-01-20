import { MongoClient } from 'mongodb'
import { disconnect } from 'process'

export const MongoHelper = {
  client: null as MongoClient,
  async connect () {
    this.client = await MongoClient.connect(process.env.MONGO_URL)
  },
  async disconnect () {
    await this.client.close()
  }
}
