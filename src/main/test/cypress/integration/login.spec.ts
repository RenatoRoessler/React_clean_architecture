import { faker } from '@faker-js/faker'

const baseUrl:string = Cypress.config().baseUrl

describe('Login', () => {
    beforeEach(() => {
        cy.visit('login')
    })
    it('Should load with correct initial state', () => {
        cy.getByTestId('email').should('have.attr', 'readonly')
        cy.getByTestId('email-status')
            .should('have.attr', 'title', 'Campo obrigatório')
            .should('contain.text', '🔴')
        cy.getByTestId('password').should('have.attr', 'readonly')
        cy.getByTestId('password-status')
            .should('have.attr', 'title', 'Campo obrigatório')
            .should('contain.text', '🔴')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present erro state if form is invalid', () => {
        cy.getByTestId('email').focus().type(faker.random.word())
        cy.getByTestId('email-status')
            .should('have.attr', 'title', 'O campo email é inválido')
            .should('contain.text', '🔴')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
        cy.getByTestId('password-status')
            .should('have.attr', 'title', 'O campo password é inválido')
            .should('contain.text', '🔴')
        cy.getByTestId('submit').should('have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present valid state if form is valid', () => {
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('email-status')
            .should('have.attr', 'title', 'Tudo certo!')
            .should('contain.text', '🟢')
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
        cy.getByTestId('password-status')
            .should('have.attr', 'title', 'Tudo certo!')
            .should('contain.text', '🟢')
        cy.getByTestId('submit').should('not.have.attr', 'disabled')
        cy.getByTestId('error-wrap').should('not.have.descendants')
    })

    it('Should present error if invalid credential are provider', () => {
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
        cy.getByTestId('submit').click()
        cy.getByTestId('error-wrap')
            .getByTestId('spinner').should('exist')
            .getByTestId('main-error').should('not.exist')
            .getByTestId('spinner').should('not.exist')
            .getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
        cy.url().should('eq', `${baseUrl}/login`)
    })
})