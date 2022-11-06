import { faker } from '@faker-js/faker'
import * as Helper from '../support/http-mock'

export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError(/login/)
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/login/, 'POST')
export const mockOk = (): void => Helper.mockOk(/login/, 'POST', {accessToken: faker.random.alphaNumeric(32)})
export const mockInvalidData = (): void => Helper.mockOk(/login/, 'POST', {invalid: faker.random.alphaNumeric(32)})