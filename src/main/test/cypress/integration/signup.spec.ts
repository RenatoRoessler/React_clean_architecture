import * as FormHelper from '../support/form-helper'
import { faker } from '@faker-js/faker'

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
})