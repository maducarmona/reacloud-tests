describe("Search OER by Knowledge Area", () => {
  it("Verify that users can filter OERs based on material formats compatible with the BNCC (Base Nacional Comum Curricular) guidelines.", () => {
    cy.visit("/");
    cy.contains("span", "ÁREA DO CONHECIMENTO");
    cy.get("#1").click();

    cy.get('ul[class*="dropDownList"]').within(() => {
      cy.contains("li", "Linguagens").click();
    });

    cy.contains("span", "TIPO DO MATERIAL");
    cy.get("#2").click();

    cy.get('ul[class*="dropDownList"]').within(() => {
      cy.contains("li", "Sites ou Materiais Online").click();
    });

    cy.get('input[placeholder="O que você procura?"]')
      .click()
      .type("OER for testing 1");
    cy.contains("button", "BUSCAR").click();

    cy.get('div[class*="reaContainer"]').should("contain", "OER for testing 1");
    cy.contains("h1", "OER for testing 1").click();

    cy.contains("OER for testing 1").should("exist");

    cy.get("li")
      .contains("strong", "Área do conhecimento:")
      .parent()
      .should("contain", "Linguagens")
      .should("be.visible");

    cy.get("li")
      .contains("strong", "Tipo do Material:")
      .parent()
      .should("contain", "Sites ou Materiais Online")
      .should("be.visible");
  });
});
