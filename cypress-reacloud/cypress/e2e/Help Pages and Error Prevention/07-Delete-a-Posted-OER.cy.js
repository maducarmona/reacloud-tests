describe('7 - Delete a Posted OER', () => {
    beforeEach(() => {
      cy.login(); // Ensure the user is logged in
    });
  
    it('Verify that users can delete an OER they posted.', () => {
      cy.visit('/');
      cy.contains('ADICIONAR RECURSO').click();
      cy.contains('EDITAR RECURSO').click();
      // Locate the container that holds both the title and the "EDITAR" button
        cy.contains('h1', 'Recurso Teste Editado').parent().parent().within(() => {
            cy.get('img[alt="Figura de remoção"]').click();
      });

      cy.contains('Remover recurso').should('be.visible');
      cy.contains(/Você deseja remover o recurso/).should('be.visible');
      cy.contains('button', 'REMOVER').click();
      cy.contains('h1', 'Recurso Teste Editado').should('not.exist');

      cy.contains('Recurso removido com sucesso').should('be.visible');
    });  
      
  });