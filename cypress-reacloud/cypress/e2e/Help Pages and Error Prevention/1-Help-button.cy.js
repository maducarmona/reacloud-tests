describe('1- Help Button', () => {
    it('Verify that users can click the help button to access the help page', () => {
        cy.visit('/'); 

        cy.get('div[class*="help"]').should('be.visible').within(() => {
            cy.get('img[title="Central de Ajuda"]').click();
        });

        cy.url().should('include', 'help');
    });
});