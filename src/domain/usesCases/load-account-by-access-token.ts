import { AccountModel } from '@/domain/models/AccountModel'

export interface LoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<AccountModel>
}
