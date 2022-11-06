import { faker } from '@faker-js/faker'

const baseUrl:string = Cypress.config().baseUrl

describe('Login', () => {
    beforeEach(() => {
        cy.server()
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

    it('Should present InvalidCredentialsError on 401', () => {
        cy.route({
            method: 'POST',
            url: /login/,
            status: 400,
            response: {
                error: faker.random.words()
            }
        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
        cy.getByTestId('submit').click()
        cy.getByTestId('spinner').should('not.exist')
        cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
        cy.url().should('eq', `${baseUrl}/login`)
    })

    it('Should present UnexpectedError on 400', () => {
        cy.route({
            method: 'POST',
            url: /login/,
            status: 401,
            response: {
                error: faker.random.words()
            }
        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
        cy.getByTestId('submit').click()
        cy.getByTestId('spinner').should('not.exist')
        cy.getByTestId('main-error').should('contain.text', 'Credenciais inválidas')
        cy.url().should('eq', `${baseUrl}/login`)
    })

    it('Should present UnexpectedError if invalid data is returned', () => {
        cy.route({
            method: 'POST',
            url: /login/,
            status: 200,
            response: {
                InvalidProperty: faker.random.alphaNumeric(32)
            }
        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
        cy.getByTestId('submit').click()
        cy.getByTestId('spinner').should('not.exist')
        cy.getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu. Tente novamente em breve.')
        cy.url().should('eq', `${baseUrl}/login`)
    })

    it('Should present save accessToke if valid credentials are provided', () => {
        cy.route({
            method: 'POST',
            url: /login/,
            status: 200,
            response: {
                accessToken: faker.random.alphaNumeric(32)
            }
        })
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6)).type('{enter}')
        cy.getByTestId('main-error').should('not.exist')
        cy.getByTestId('spinner').should('not.exist')
        cy.url().should('eq', `${baseUrl}/`)
        cy.window().then(window => assert.isOk(window.localStorage.getItem('accessToken')))
    })

    it('Should prevent multiple submits', () => {
        cy.route({
            method: 'POST',
            url: /login/,
            status: 200,
            response: {
                accessToken: faker.random.alphaNumeric(32)
            }
        }).as('request')
        cy.getByTestId('email').focus().type(faker.internet.email())
        cy.getByTestId('password').focus().type(faker.random.alphaNumeric(6))
        cy.getByTestId('submit').dblclick()
        cy.get('@request.all').should('have.length', 1)
    })
})