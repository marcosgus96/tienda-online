describe('Página de Inicio', () => {
  it('Debe cargar la página de inicio y mostrar el título correcto', () => {
    cy.visit('/')
    cy.contains('Productos Destacados')
  })
})
