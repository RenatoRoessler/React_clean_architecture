const baseUrl: string = Cypress.config().baseUrl

export const testInputStatus = (fieldName: string, errorMessage?: string): void => {
    cy.getByTestId(`${fieldName}-wrap`).should('have.attr', 'data-status', errorMessage ? 'invalid' : 'valid')
    const attr = `${errorMessage ? '' : 'not.'}have.attr`
    cy.getByTestId(`${fieldName}`).should(attr, 'title', errorMessage)
    cy.getByTestId(`${fieldName}-label`).should(attr, 'title', errorMessage)
}

export const testMainError = (errorMessage: string): void => {
    cy.getByTestId('spinner').should('not.exist')
    cy.getByTestId('main-error').should('contain.text', errorMessage)
}

export const testHttpCallsCount = (count: number): void => {
    cy.get('@request.all').should('have.length', count)
}

export const testUrl = (path: string): void => {
    cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string): void => {
    cy.window().then(window => assert.isOk(window.localStorage.getItem(key)))
}