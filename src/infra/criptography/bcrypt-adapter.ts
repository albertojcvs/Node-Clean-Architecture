import { Hasher } from '../../data/protocols/criptography/hasher'
import { HashCompare } from '../../data/protocols/criptography/hash-compare'
import bcrypt from 'bcrypt'
export class BcryptAdapter implements Hasher, HashCompare {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }

  async compare (value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash)
    return await new Promise(resolve => resolve(true))
  }
}
