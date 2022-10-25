/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Footer, FormStatus, Input,
  LoginHeader
} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Styles from './signup-styles.scss'

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
        <form data-testid="form" className={Styles.form} >
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu Nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite seu senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Repita sua senha"
          />
          <button
            data-testid="submit"
            type="submit"
            className={Styles.submit}
          >
            Entrar
          </button>
          <span className={Styles.link} onClick={() => navigate('/login')} >Voltar para Login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
