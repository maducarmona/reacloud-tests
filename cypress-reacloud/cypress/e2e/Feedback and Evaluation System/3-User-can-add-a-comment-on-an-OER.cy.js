describe('3 - User can add a comment on an OER', () => {
    beforeEach(() => {
        cy.login(); 
    });
  
    it('Verify that users can add a textual comment to a resource.', () => {
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

    });
  });