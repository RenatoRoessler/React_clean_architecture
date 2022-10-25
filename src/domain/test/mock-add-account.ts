import { AddAccountParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockAccountParams = (): AddAccountParams => {
  const password = faker.internet.password()
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}
