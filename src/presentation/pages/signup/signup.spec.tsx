import { Helper, ValidationStub } from '@/presentation/test'
import { faker } from '@faker-js/faker'
import { cleanup, render, RenderResult } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import SignUp from './signup'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <BrowserRouter>
      <SignUp validation={validationStub} />
    </BrowserRouter>
  )
  return { sut }
}

describe('SignUp Component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut,'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStateForField(sut, 'name', validationError)
    Helper.testStateForField(sut, 'email', 'Campo obrigatório')
    Helper.testStateForField(sut, 'password', 'Campo obrigatório')
    Helper.testStateForField(sut, 'passwordConfirmation', 'Campo obrigatório')
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'name')
    Helper.testStateForField(sut, 'name', validationError)
  })
})
