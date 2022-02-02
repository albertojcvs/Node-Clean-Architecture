import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  url: process.env.MONGO_URL,
  async connect (url: string) {
    this.client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },
  async disconnect () {
    await this.client.close()
  },
  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) await this.connect(this.url)

    return this.client.db().collection(name)
  },
  map (data: any): any {
    const { _id, ...collectionWithoutId } = data
    return Object.assign({}, collectionWithoutId, { id: _id })
  },
  mapCollection (collection: any[]): any[] {
    return collection.map(c => MongoHelper.map(c))
  }
}
