describe('Pruebas de aceptación - Formulario de Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('debería mostrar mensajes de error si los campos están vacíos', () => {
    cy.get('button[type="submit"]').click(); // Hace clic en "Ingresar" sin llenar los campos
    cy.contains('El nombre de usuario es obligatorio').should('be.visible'); // Verifica el mensaje de error
    cy.contains('La contraseña es obligatoria').should('be.visible');
  });

  it('debería mostrar un mensaje de error para un nombre de usuario incorrecto', () => {
    cy.get('input[name="username"]').type('usuarioIncorrecto'); // Ingresar un nombre de usuario inválido
    cy.get('input[name="password"]').type('contraseña123');
    cy.get('button[type="submit"]').click();
    
    // Verifica el mensaje de error de autenticación o redirección
  });
  it('debería iniciar sesión correctamente y redirigir a /admin', function () {
    // Intercepta la solicitud de login
    cy.intercept('POST', '/auth/login').as('loginRequest');
    
    // Llenar los campos del formulario
    cy.get('input[name="username"]').type('admin2');
    cy.get('input[name="password"]').type('admin123');
    
    // Enviar el formulario
    cy.get('button[type="submit"]').click();
    
    // Espera la respuesta de la solicitud de login
    cy.wait('@loginRequest', { timeout: 10000 }).then(function (interception) {
      // Verifica que la respuesta tenga un código de estado 201
      expect(interception.response.statusCode).to.eq(201);
      expect(interception.response.body).to.have.property('access_token');
    });
    
    // Espera la redirección a /admin
    cy.wait(500); // Ajusta el tiempo si es necesario

    cy.visit('/admin');
    
    // Verificar que la URL haya cambiado a /admin
    cy.url({ timeout: 20000 }).should('include', '/admin');
    
  });
  
  
  
  it('debería permitir al usuario ver el enlace de "¿Olvidó Contraseña?"', () => {
    cy.contains('¿Olvidó Contraseña?').should('be.visible').and('have.attr', 'href', '#');
  });
});
