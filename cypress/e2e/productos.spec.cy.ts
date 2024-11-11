describe('Listado de Productos', () => {
  it('Debe mostrar una lista de productos', () => {
    // Interceptamos la solicitud para asegurarnos de que los productos se han cargado
    cy.intercept('GET', '/productos*').as('getProductos');
    cy.visit('/');
    cy.wait('@getProductos');
    // Verificamos que hay productos en la página
    cy.get('[data-cy="producto-item"]').should('have.length.greaterThan', 0);
  });
});
