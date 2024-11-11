describe('Navegar a la página de Nuevo Producto', () => {


  it('debería redirigir al usuario a la página de Nuevo Producto al hacer clic en "Nuevo Producto"', () => {
    cy.visit('/login');
    // Completar los campos de usuario y contraseña
    cy.get('input[name="username"]').type('admin2'); // Asegúrate de usar un usuario válido
    cy.get('input[name="password"]').type('admin123'); // Asegúrate de usar una contraseña válida
  
    // Hacer clic en el botón de login
    cy.get('button[type="submit"]').click();
  
    cy.visit('/admin');
  
    // Verificar que la URL haya cambiado a /admin
    cy.url({ timeout: 15000 }).should('include', '/admin');
    
    // También verificar que el panel de administración esté visible (por ejemplo, un título o un elemento específico)
    cy.contains('Panel de Administración').should('be.visible'); // Cambia esto según el texto de tu panel

    // Verifica que el botón "Nuevo Producto" esté visible
    cy.contains('Nuevo Producto').should('be.visible');

    // Haz clic en el botón "Nuevo Producto"
    cy.contains('Nuevo Producto').click();

    // Verifica que la URL cambió correctamente a /admin/nuevo
    cy.url().should('include', '/admin/nuevo');
  });
});
