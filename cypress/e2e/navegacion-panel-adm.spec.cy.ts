describe('Login y navegación al panel de administración', () => {
  beforeEach(() => {
    // Visita la página de login antes de cada prueba
    cy.visit('/login');
  });

  it('debería permitir al usuario navegar al panel de administración después de iniciar sesión', () => {
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
  });
});
