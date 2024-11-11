// cypress/support/index.d.ts

declare namespace Cypress {
    interface Chainable<Subject = any> {
      /**
       * Comando personalizado para iniciar sesión
       * @example cy.login('usuario', 'contraseña')
       */
      login(username: string, password: string): Chainable<void>;
    }
  }
  