import { makeRemoteAuthenticaion } from '@/main/usecases/authenticaion/remote-authentication-factory'
import { Login } from '@/presentation/pages'
import React from 'react'
import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthenticaion()}
      validation={makeLoginValidation()}
    />
  )
}
