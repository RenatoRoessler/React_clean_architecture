import { BrowserRouter } from 'react-router-dom'
import SignUp from './signup'
import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { Helper } from '@/presentation/test'

type SutTypes = {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(
    <BrowserRouter>
      <SignUp />
    </BrowserRouter>
  )
  return { sut }
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const { sut } = makeSut()
    const validationError = 'Campo obrigatório'
    Helper.testChildCount(sut,'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStateForField(sut, 'name', validationError)
    Helper.testStateForField(sut, 'email', validationError)
    Helper.testStateForField(sut, 'password', validationError)
    Helper.testStateForField(sut, 'passwordConfirmation', validationError)
  })
})
