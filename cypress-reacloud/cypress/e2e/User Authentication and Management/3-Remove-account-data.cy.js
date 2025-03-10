describe("3 - Remove account data", () => {
    beforeEach(() => {
      cy.login(); // Ensure the user is logged in
    });
  
    it("Verify that users can delete their accounts from the portal.", () => {
      cy.visit("/");
      cy.contains("MEU PERFIL").click();
  
      cy.contains('Deletar conta').should('be.visible').click();

      cy.get('div[class*="modalContainer"]')
        .within(() => {
            cy.contains('Remover Conta?').should('be.visible');
            cy.contains('Essa ação vai remover todos os seus dados do site, incluindo recursos e comentários.').should('be.visible');
            cy.contains('CANCELAR').should('be.visible');
            cy.contains('REMOVER').should('be.visible').click();
        });
    });
  });
  