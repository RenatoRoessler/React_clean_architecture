export class InvalidFieldError extends Error {
  constructor (readonly field: string) {
    super(`O campo ${field} é inválido`)
    this.name = 'InvalidFieldError'
  }
}
