import { HttpPostClientSpy } from '@/data/test'
import { AccountModel } from '@/domain/models'
import { mockAccountParams } from '@/domain/test'
import { AddAccountParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { RemoteAddAccount } from './remote-add-account'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return {
    sut, httpPostClientSpy
  }
}

describe('RemoteAddAccount', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.add(mockAccountParams())
    expect(httpPostClientSpy.url).toBe(url)
  })
})
