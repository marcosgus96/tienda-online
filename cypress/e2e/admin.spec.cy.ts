describe('Administración de Productos', () => {
  it('Debe iniciar sesión y navegar al panel de administración', () => {
    // Iniciar sesión
    cy.login('admin2', 'admin123') // Reemplaza con credenciales válidas

    // Verificar que se redirecciona al panel de administración
    cy.url().should('include', '/admin')

    // Verificar que el encabezado del panel de administración está presente
    cy.get('h4').should('contain', 'Panel de Administración')

    // Hacer clic en "Nuevo Producto"
    cy.contains('Nuevo Producto').click()

    // Verificar que estamos en la página para crear un nuevo producto
    cy.url().should('include', '/admin/nuevo');

    // Aquí puedes agregar más aserciones o acciones, como completar el formulario
    
    // Verificar que el botón "Nuevo Producto" está visible
    cy.contains('Nuevo Producto').should('be.visible')
  })
})
