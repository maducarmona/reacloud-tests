describe("Search with No Results", () => {
    it("Verify the system’s behavior when a search query returns no results.", () => {
        cy.visit('/');
        cy.get('input[placeholder="O que você procura?"]').click().type('NULL');
        cy.contains('button', 'BUSCAR').click();

        cy.get('div[class*="reaContainer"]').should('exist').should('not.be.visible');
        cy.get('div[class*="contentContainer"]').should('not.exist');

        cy.contains('Nenhum recurso encontrado').should('exist').should('be.visible');
    });
});