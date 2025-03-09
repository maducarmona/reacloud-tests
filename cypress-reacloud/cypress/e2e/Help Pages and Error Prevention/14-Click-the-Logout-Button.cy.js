describe("14 - Click the Logout Button", () => {
  beforeEach(() => {
    cy.login(); // Ensure the user is logged in
  });

  it("Verify that users can log out of their account.", () => {
    cy.visit("/");
    cy.contains("SAIR").click();

    cy.contains("Você saiu da sua conta.").should("be.visible");
    cy.contains("ENTRE OU CADASTRE-SE").should("be.visible");
  });
});
