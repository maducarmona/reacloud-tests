describe('11 - Remove a Comment to an OER', () => {
    beforeEach(() => {
        cy.login(); 
    });
  
    it('Verify that users can remove a comment they posted.', () => {
        cy.visit('/'); 
        cy.contains('button', 'BUSCAR').click();

        cy.wait(2000);
  
        cy.get('div[class*="reaContainer"]').should('exist').should('be.visible');
        cy.get('div[class*="contentContainer"]').should('exist');

        cy.get('div[class*="contentContainer"]').eq(0).click();

        cy.get('textarea#commentTextArea').type('This is a test comment!');

        cy.get('button[class*="submitButton"]').click();

        cy.get('div[class*="commentList"]').should('exist').should('be.visible').should('have.length.gt', 0);

        cy.get('div[class*="commentList"]').should('contain', 'This is a test comment!');

        cy.get('div[class*="commentList"]').contains('button', 'Excluir').should('exist').should('be.visible').click();

        cy.contains('Remover comentário').should('exist').should('be.visible');
        cy.contains(/Você deseja mesmo remover o seu comentário?/).should('exist').should('be.visible');
        cy.get('div[class*="modalContainer"]').within(() => {
            cy.get('div[class*="buttonsContainer"]').within(() => {
                cy.contains('button', 'CANCELAR').should('exist').should('be.visible'); 
                cy.contains('button', 'REMOVER').should('exist').should('be.visible').click();
            });
        });

        cy.contains('Comentário removido com sucesso.').should('be.visible');

        cy.get('div[class*="commentList"]').should('not.contain', 'This is a test comment!');

    });
  });