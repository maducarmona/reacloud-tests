describe("2 - Change account data", () => {
  beforeEach(() => {
    cy.login(); // Ensure the user is logged in
  });

  it("Verify that users can update their profile data.", () => {
    cy.visit("/");
    cy.contains("MEU PERFIL").click();

    cy.get('div[class*="inputWithButton"]')
      .eq(0)
      .within(() => {
        cy.get("button").click();
      });

    cy.get('input[name="given_name"]').clear().type("Maria Teste");
    cy.get('input[name="family_name"]').clear().type("Maria Teste Family");
    cy.get('input[name="institution"]').clear().type("Maria Teste Institution");
    cy.get('input[name="profile"]').clear().type("Maria Teste Profile");

    cy.get('button[type="submit"]').click();

    cy.contains("Dados salvos com sucesso!").should("be.visible");
    cy.contains("Seu perfil foi atualizado.").should("be.visible");

    cy.reload();

    cy.get('input[name="given_name"]').should("have.value", "Maria Teste");
    cy.get('input[name="family_name"]').should(
      "have.value",
      "Maria Teste Family"
    );
    cy.get('input[name="institution"]').should(
      "have.value",
      "Maria Teste Institution"
    );
    cy.get('input[name="profile"]').should("have.value", "Maria Teste Profile");
  });
});
