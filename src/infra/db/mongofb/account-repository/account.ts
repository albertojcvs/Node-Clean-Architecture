import { AddAccountRepository } from '../../../../data/protocols/db/add-accunt-repository'
import { AccountModel } from '../../../../domain/models/AccountModel'
import { AddAccountModel } from '../../../../domain/usesCases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }
}
