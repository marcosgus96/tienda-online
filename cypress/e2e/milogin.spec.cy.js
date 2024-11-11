describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8000/login')
    cy.contains('Ingresar').should('be.visible')
    cy.get('#username').type('dev6')
    cy.get('#password').type('dev6')
    cy.get('[data-testid="acceder"]').click()
    cy.contains('Reviewer dashboard').should('be.visible')
  })
})
