describe('5 - User can report an issue from an OER', () => {
    beforeEach(() => {
        cy.login(); 
    });
  
    it('Verify that users can report an issue about an OER..', () => {
        cy.visit('/'); 
        cy.contains('button', 'BUSCAR').click();

        cy.wait(2000);
  
        cy.get('div[class*="reaContainer"]').should('exist').should('be.visible');
        cy.get('div[class*="contentContainer"]').should('exist');

        cy.get('div[class*="contentContainer"]').eq(0).click();

        cy.contains('Informar um Problema').should('exist').should('be.visible').click();

        cy.contains('Por favor, informe qual o problema com o recurso.').should('exist').should('be.visible');
        cy.get('div[class*="modalContainer"]').within(() => {
            cy.get('textarea').type('This is a test issue report!');
            cy.contains('button', 'CANCELAR').should('exist').should('be.visible');
            cy.contains('button', 'ENVIAR').should('exist').should('be.visible').click();
        });

        cy.contains('Sucesso!').should('exist').should('be.visible');
        cy.contains('Seu problema foi enviado.').should('exist').should('be.visible');
    });
});