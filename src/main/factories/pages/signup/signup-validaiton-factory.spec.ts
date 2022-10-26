import { ValidationBuilder as Builder } from '@/validation/builder/validation-builder'
import { ValidationComposite } from '@/validation/validators'
import { makeSigUpValidation } from './signup-validation-factory'

describe('sIGuPValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSigUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      ...Builder.field('name').required().min(5).build(),
      ...Builder.field('email').required().email().build(),
      ...Builder.field('password').required().min(5).build(),
      ...Builder.field('passwordConfirmation').required().sameAs('password').build()
    ]))
  })
})
