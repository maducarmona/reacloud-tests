describe('2 - Help Page Sections', () => {
    it('Verify that users can navigate between the three sections of the help page.', () => {
        cy.visit('/'); 

        cy.get('div[class*="help"]').should('be.visible').within(() => {
            cy.get('img[title="Central de Ajuda"]').click();
        });

        cy.url().should('include', 'help');

        cy.contains('FAQ');
        cy.contains('Problemas Comuns');
        cy.contains('Guias Passo-a-Passo');
    });
});