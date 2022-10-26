import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (field: object): Error {
    return field[this.field]?.length < this.minLength ? new InvalidFieldError(this.field) : null
  }
}
