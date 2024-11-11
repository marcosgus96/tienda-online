describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8000/')
    cy.contains('Artículos publicados').should('be.visible')
    cy.get('[data-testid="button-acceder"]').should('be.visible')
    cy.get('[data-testid="button-acceder"]').click()
  })
})

// // ABSOLUTE


//  <html>
//   <body>
//     <div>
//       <ul>
//         <li>Elemento 1</li>
//         <li>Elemento 2</li>
//         <li id="objetivo">Elemento 3</li>
//       </ul>
//     </div>
//     <div>
//       <ul>
//         <li>Elemento 1</li>
//         <li>Elemento 2</li>
//         <li id="objetivo">Elemento 3</li>
//       </ul>
//     </div>
//   </body>
// </html>

// // Absoluta
// cy.get('html > body > div[1] > ul > li#objetivo')

// // Relativa
// cy.get('li#objetivo')
