describe('Verificar que el producto aparece en la lista', () => {
  beforeEach(() => {
    // Visita el panel de administración
    cy.visit('/');
  });

  it('debería mostrar el producto recién creado en la lista', () => {

    // Ahora verifica que el producto aparezca en la lista
    cy.contains('Leche Pil').should('be.visible');  // Verifica que el nombre del producto esté visible en la lista
    cy.contains('$99.9').should('be.visible');  // Verifica que el precio esté visible en la lista
  });
});
