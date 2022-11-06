import { faker } from '@faker-js/faker'
import * as Helper from './http-mock'

export const mockIEmailInUseError = (): void => Helper.mockIEmailInUseError(/signup/)