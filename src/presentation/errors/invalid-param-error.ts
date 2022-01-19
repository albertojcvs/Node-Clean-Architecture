export class InvalidParamError extends Error {
  constructor (invalidParam: string) {
    super(`InalidParam: ${invalidParam}`)
    this.name = 'InvalidParamError'
  }
}
