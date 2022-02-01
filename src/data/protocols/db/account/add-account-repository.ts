import { AddAccountModel } from '@/domain/usesCases/add-account'
import { AccountModel } from '@/domain/models/AccountModel'

export interface AddAccountRepository{
  add: (account: AddAccountModel) => Promise<AccountModel>
}
