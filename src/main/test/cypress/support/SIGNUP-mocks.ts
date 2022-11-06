import { faker } from '@faker-js/faker'
import * as Helper from './http-mock'

export const mockIEmailInUseError = (): void => Helper.mockIEmailInUseError(/signup/)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/signup/, 'POST')
export const mockInvalidData = (): void => Helper.mockOk(/signup/, 'POST', {invalid: faker.random.alphaNumeric(32)})