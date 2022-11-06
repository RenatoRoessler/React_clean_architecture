import * as FormHelper from '../support/form-helper'
import { faker } from '@faker-js/faker'
import * as Http from '../support/signup-mocks'

const populateFields = (): void => {
    cy.getByTestId('name').focus().type(faker.random.alphaNumeric(8))
    cy.getByTestId('email').focus().type(faker.internet.email())
    const password = faker.random.alphaNumeric(6)
    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password)
}
const simulateValidSubmit = (): void => {
    populateFields()
    cy.getByTestId('submit').click()
}

describe('Signup', () => {
    beforeEach(() => {
        cy.visit('signup')
    })

    it('Should load with correct initial state', () => {        
        cy.getByTestId('email').should('have.attr', 'readonly')
        FormHelper.testInputStatus('email', 'Campo obrigatório')
        cy.getByTestId('name').should('have.attr', 'readonly')
        FormHelper.testInputStatus('name', 'Campo obrigatório')
        cy.getByTestId('password').should('have.attr', 'readonly')
        FormHelper.testInputStatus('password', 'Campo obrigatório')
        cy.getByTestId('passwordConfirmation').should('have.attr', 'readonly')
        FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present erro state if form is invalid', () => {
        cy.getByTestId('name').focus().type(faker.random.alphaNumeric(3))
        FormHelper.testInputStatus('name', 'O campo name é inválido')
        cy.getByTestId('email').focus().type(faker.random.word())
        FormHelper.testInputStatus('email', 'O campo email é inválido')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
        FormHelper.testInputStatus('password', 'O campo password é inválido')
        cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(4))
        FormHelper.testInputStatus('passwordConfirmation', 'O campo passwordConfirmation é inválido')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present valid state if form is valid', () => {
        cy.getByTestId('name').focus().type(faker.random.alphaNumeric(5))
        FormHelper.testInputStatus('name')
        cy.getByTestId('email').focus().type(faker.internet.email())
        FormHelper.testInputStatus('email')
        const password = faker.random.alphaNumeric(5)
        cy.getByTestId('password').focus().type(password)
        FormHelper.testInputStatus('password')
        cy.getByTestId('passwordConfirmation').focus().type(password)
        FormHelper.testInputStatus('passwordConfirmation')
        cy.getByTestId('submit').should('not.have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present EmailInUse on 403', () => {
        Http.mockIEmailInUseError()
        simulateValidSubmit()
        FormHelper.testMainError('Esse e-mail já está em uso')
        FormHelper.testUrl('/signup')
    })

    it('Should present UnexpectedError on default erro cases', () => {
        Http.mockUnexpectedError()
        simulateValidSubmit()
        FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve.')
        FormHelper.testUrl('/signup')
    })

    it('Should present UnexpectedError if invalid data is returned', () => {
        Http.mockInvalidData()
        simulateValidSubmit()
        FormHelper.testMainError('Algo de errado aconteceu. Tente novamente em breve.')
        FormHelper.testUrl('/signup')
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
        populateFields()
        cy.getByTestId('submit').dblclick()
        FormHelper.testHttpCallsCount(1)
    })
})