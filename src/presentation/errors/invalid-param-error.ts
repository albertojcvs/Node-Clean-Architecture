export class InvalidParamError extends Error {
  constructor (invalidParam: string) {
    super(`Missing param: ${invalidParam}`)
    this.name = 'MissingParamError'
  }
}
