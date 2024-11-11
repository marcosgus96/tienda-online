it('Debe crear un nuevo producto', () => {
  // Iniciar sesión
  cy.login('admin', 'adminpassword')

  // Navegar al formulario de nuevo producto
  cy.visit('/admin/nuevo')

  // Completar el formulario
  cy.get('input[name="nombre"]').type('Producto de Prueba');
  cy.get('[data-cy="input-descripcion"]').type('Descripción del producto de prueba');
  cy.get('input[name="precio"]').type('99.99');
  cy.get('input[name="categoriaId"]').type('1'); // Cambia según tu implementación
  cy.get('input[name="stock"]').type('100');

  // Subir una imagen (si corresponde)
  cy.get('input[name="imagen"]').attachFile('imagen.jpg') // Necesitarás cypress-file-upload

  // Enviar el formulario
  cy.get('button[type="submit"]').click()

  // Verificar que el producto aparece en la lista
  cy.contains('Producto de Prueba').should('be.visible')
})
