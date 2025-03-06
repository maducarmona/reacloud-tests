describe('My First Test', () => {
    it('Visits the Cypress website', () => {
      cy.visit('https://www.cypress.io');
      cy.contains('npm install cypress').should('exist');
    });
  });