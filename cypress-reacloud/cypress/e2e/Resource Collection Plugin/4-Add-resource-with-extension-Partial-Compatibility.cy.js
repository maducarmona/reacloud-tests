describe("4 - Add a resource from Khan Academy via the extension (Partial Compatibility)", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Verify that users can extract some metadata through the extension on a partial compatible site.", () => {
    cy.visit("/");

    cy.get('span[class*="badge"]')
      .should("exist")
      .invoke("text")
      .then((text) => {
        // Parse the text into a number
        const badgeNumber = parseInt(text, 10);

        // Assert that the number is at least 1
        expect(badgeNumber).to.be.at.least(1);
      });

    cy.contains("ADICIONAR RECURSO").click();
    cy.contains("ADICIONAR NOVOS RECURSOS").click();

    cy.contains("Khan Resource")
      .should("be.visible")
      .parent()
      .parent()
      .within(() => {
        cy.contains("ADICIONAR").click();
      });

    cy.wait(1000);

    //Verificar apenas os campos obrigatórios
    cy.get('input#title').should('not.have.value', '');
    cy.get("input#source").should('not.have.value', '');
    cy.get("input#date").should('not.have.value', '');
    cy.get("input#description").should('not.have.value', '');
    cy.get('div[class*="cornerUpload"]').within(() => {
      cy.get('img').should('have.attr', 'src').and('not.be.empty');
  });

  });
});
