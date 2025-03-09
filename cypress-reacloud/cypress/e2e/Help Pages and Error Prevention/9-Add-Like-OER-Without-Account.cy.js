describe('9 - Add a "Like" to an OER Without an Account', () => {
  it('Verify that users cannot like an OER without logging in.', () => {
    cy.visit("/");
    cy.contains("button", "BUSCAR").click();

    cy.wait(2000);

    cy.get('div[class*="reaContainer"]').should("exist").should("be.visible");
    cy.get('div[class*="contentContainer"]').should("exist");

    cy.get('div[class*="contentContainer"]')
      .eq(0)
      .within(() => {
        cy.get('img[alt="Joinha"]').click();
      });

    cy.contains("Falha ao tentar avaliar o recurso.").should("be.visible");
    cy.contains("Você não está logado. Faça login para poder avaliar.").should(
      "be.visible"
    );

    // Now verify if like button works directly on the OER page
    cy.get('div[class*="contentContainer"]').eq(2).click();

    cy.get('img[alt="Joinha"]').click();

    cy.contains("Falha ao tentar avaliar o recurso.").should("be.visible");
    cy.contains("Você não está logado. Faça login para poder avaliar.").should(
      "be.visible"
    );
  });
});
