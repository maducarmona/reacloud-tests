describe("Search OER by Knowledge Area", () => {
  it("Verify that users can filter OERs based on material formats compatible with the BNCC (Base Nacional Comum Curricular) guidelines.", () => {
    cy.visit("/");
    cy.contains("span", "ÁREA DO CONHECIMENTO");
    cy.get("#1").click();

    cy.get('ul[class*="dropDownList"]').within(() => {
      cy.contains("li", "Matemática").click();
    });

    cy.contains("span", "TIPO DO MATERIAL");
    cy.get("#2").click();

    cy.get('ul[class*="dropDownList"]').within(() => {
      cy.contains("li", "Recursos Interativos e Digitais").click();
    });

    cy.get('input[placeholder="O que você procura?"]')
      .click()
      .type("Recurso Teste 3");
    cy.contains("button", "BUSCAR").click();

    cy.get('div[class*="reaContainer"]').should("contain", "Recurso Teste 3");
    cy.contains("h1", "Recurso Teste 3").click();

    cy.contains("Recurso Teste 3").should("exist");

    cy.get("li")
      .contains("strong", "Área do conhecimento:")
      .parent()
      .should("contain", "Matemática")
      .should("be.visible");

    cy.get("li")
      .contains("strong", "Tipo do Material:")
      .parent()
      .should("contain", "Recursos Interativos e Digitais")
      .should("be.visible");
  });
});
