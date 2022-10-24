import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from './local-storage-adapter'

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter()

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with correct values', async () => {
    const sut = makeSut()
    const key = faker.database.column()
    const value = faker.random.alphaNumeric(100)
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
