describe('Edit a posted OER', () => {
    beforeEach(() => {
      cy.login(); // Ensure the user is logged in
    });
  
    it('should allow the user to edit a posted OER', () => {
      cy.visit('/');
      cy.contains('ADICIONAR RECURSO').click();
      cy.contains('EDITAR RECURSO').click();
      // Locate the container that holds both the title and the "EDITAR" button
        cy.contains('h1', 'Updated OER Title').parent().parent().within(() => {
            cy.get('img[alt="Figura de remoção"]').click();
      });

      cy.contains('Remover recurso').should('be.visible');
      cy.contains(/Você deseja remover o recurso/).should('be.visible');
      cy.contains('button', 'REMOVER').click();
      cy.contains('h1', 'Sample OER Title').should('not.exist');
    });  
      
  });