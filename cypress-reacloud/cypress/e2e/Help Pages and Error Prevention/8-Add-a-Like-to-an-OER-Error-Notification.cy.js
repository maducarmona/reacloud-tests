describe('8 - Add a "Like" to an OER Error Notification', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Verify that users get notified of an error when the "like" does not work.', () => {
    cy.visit("/");
    cy.contains("button", "BUSCAR").click();

    cy.wait(2000);

    cy.get('div[class*="reaContainer"]').should("exist").should("be.visible");
    cy.get('div[class*="contentContainer"]').should("exist");

    // Intercept the like API request and simulate a 500 error
    cy.intercept("POST", "/api/recurso/*/like", {
      statusCode: 500,
      body: { message: "Internal Server Error" },
    }).as("likeRequest");

    cy.get('div[class*="contentContainer"]')
      .eq(0)
      .within(() => {
        cy.get('img[alt="Joinha"]').click();
      });

    cy.wait("@likeRequest");

    cy.contains("Falha ao tentar avaliar o recurso.").should("be.visible");
    cy.contains("Verifique sua conexão e tente mais tarde.").should(
      "be.visible"
    );

    // Now verify if like button works directly on the OER page
    cy.get('div[class*="contentContainer"]').eq(2).click();

    cy.get('img[alt="Joinha"]').click();

    cy.wait("@likeRequest");

    cy.contains("Falha ao tentar avaliar o recurso.").should("be.visible");
    cy.contains("Verifique sua conexão e tente mais tarde.").should(
      "be.visible"
    );
  });
});
