import { faker } from '@faker-js/faker'
import * as FormHelper from '../support/form-helper'
import * as Http from '../support/login-mocks'

const simulateValidSubmit = (): void => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
    cy.getByTestId('submit').click()
}

describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })

    it('Should load with correct initial state', () => {        
        cy.getByTestId('email').should('have.attr', 'readonly')
        FormHelper.testInputStatus('email', 'Campo obrigatório')
        cy.getByTestId('password').should('have.attr', 'readonly')
        FormHelper.testInputStatus('password', 'Campo obrigatório')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present erro state if form is invalid', () => {
        cy.getByTestId('email').focus().type(faker.random.word())
        FormHelper.testInputStatus('email', 'O campo email é inválido')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
        FormHelper.testInputStatus('password', 'O campo password é inválido')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present valid state if form is valid', () => {
        cy.getByTestId('email').focus().type(faker.internet.email())
        FormHelper.testInputStatus('email')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
        FormHelper.testInputStatus('password')
        cy.getByTestId('submit').should('not.have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present InvalidCredentialsError on 401', () => {
        Http.mockInvalidCredentialsError()
        simulateValidSubmit()
        FormHelper.testMainError('Credenciais inválidas')
        FormHelper.testUrl('/login')
    })

    it('Should present UnexpectedError on 400', () => {
        Http.mockUnexpectedError()
        simulateValidSubmit()
        FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve.')
        FormHelper.testUrl('/login')
    })

    it('Should present UnexpectedError if invalid data is returned', () => {
        Http.mockInvalidData()
        simulateValidSubmit()
        FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve.')
        FormHelper.testUrl('/login')
    })

    it('Should present save accessToke if valid credentials are provided', () => {
        Http.mockOk()
        simulateValidSubmit()
        cy.getByTestId('main-error').should('not.exist')
        cy.getByTestId('spinner').should('not.exist')
        FormHelper.testUrl('/')
        FormHelper.testLocalStorageItem('accessToken')
    })

    it('Should prevent multiple submits', () => {
        Http.mockOk()
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
        cy.getByTestId('submit').dblclick()
        FormHelper.testHttpCallsCount(1)
    })

    it('Should not call submit if form is invalid', () => {
        Http.mockOk()
        cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')
        FormHelper.testHttpCallsCount(0)
    })
})