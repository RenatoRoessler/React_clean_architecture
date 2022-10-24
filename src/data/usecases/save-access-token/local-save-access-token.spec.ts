import { faker } from '@faker-js/faker'
import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorageSpy } from '../../test'

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return {
    sut,
    setStorageSpy
  }
}

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with corret value', async () => {
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.random.alphaNumeric(100)
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
