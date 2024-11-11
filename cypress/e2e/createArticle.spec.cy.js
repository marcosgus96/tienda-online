describe('Crear un Producto desde la Interfaz', () => {
  it('Debería permitir crear un producto y verificar que aparece en la lista', () => {
    // Paso 1: Iniciar sesión en la aplicación
    cy.visit('/');
    cy.get('input[name="email"]').type('admin@example.com');  // Sustituye por credenciales válidas
    cy.get('input[name="password"]').type('adminpassword');
    cy.get('button[type="submit"]').click();
    
    // Paso 2: Navegar al panel de administración
    cy.url().should('include', '/admin');
    
    // Paso 3: Hacer clic en "Nuevo Producto"
    cy.get('button').contains('Nuevo Producto').click();
    
    // Paso 4: Completar el formulario y enviar
    cy.get('input[name="nombre"]').type('Producto de Prueba');
    cy.get('textarea[name="descripcion"]').type('Descripción del producto de prueba');
    cy.get('input[name="precio"]').type('100');
    cy.get('button[type="submit"]').click();
    
    // Paso 5: Verificar que el producto aparece en la lista
    cy.url().should('include', '/admin/products');
    cy.contains('Producto de Prueba').should('exist');
  });
});
