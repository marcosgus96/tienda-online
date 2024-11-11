describe('Detalle de Producto', () => {
  it('Debe navegar al detalle de un producto al hacer clic en él', () => {
    cy.visit('/')
    cy.get('[data-cy="producto-item"]').first().click()
    cy.url().should('include', '/productos/')
    cy.get('[data-cy="producto-detalle"]').should('be.visible')
  })
})
