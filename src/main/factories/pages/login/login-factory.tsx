import { makeRemoteAuthenticaion } from '@/main/usecases/authenticaion/remote-authentication-factory'
import { makeLocalSaveAccessToken } from '@/main/usecases/save-access-token/local-save-access-token-factory'
import { Login } from '@/presentation/pages'
import React from 'react'
import { makeLoginValidation } from './login-validation-factory'

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthenticaion()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
