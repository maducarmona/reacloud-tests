describe("6 - Edit a Posted OER", () => {
  it("Verify error message when not logged in", () => {
    cy.visit("/postedreaedit/29");

    // Save the resource
    cy.get('button#submitButton').click();

    cy.contains("Erro ao editar recurso.").should("be.visible");
    cy.contains("Você precisa estar logado para editar um recurso.").should(
      "be.visible"
    );
  });

  it("Verify generic error message when editing OER", () => {
    cy.login();
    cy.visit("/");
    cy.contains("ADICIONAR RECURSO").click();
    cy.contains("EDITAR RECURSO").click();
    // Locate the container that holds both the title and the "EDITAR" button
    cy.contains("h1", "Recurso Teste 2")
      .parent()
      .parent()
      .within(() => {
        cy.contains("EDITAR").click();
      });

      cy.intercept('PUT', /\/api\/recurso\/\d+/, {
        statusCode: 500, // Force a server error
        body: { message: "Internal Server Error" }
      }).as('editRecursoRequest');

    cy.get('form#reaconfig').submit();

    cy.wait('@editRecursoRequest');

    cy.contains("Erro ao editar recurso.").should("be.visible");
    cy.contains("Por favor, tente novamente.").should("be.visible");
  });

    it("Verify message when editing OER successfully", () => {
        cy.login();
        cy.visit("/");
        cy.contains("ADICIONAR RECURSO").click();
        cy.contains("EDITAR RECURSO").click();
        // Locate the container that holds both the title and the "EDITAR" button
        cy.contains("h1", "Updated OER Title 2")
        .parent()
        .parent()
        .within(() => {
            cy.contains("EDITAR").click();
        });
    
        cy.get('input[name="title"]').clear().type("Recurso Teste Editado");
        cy.get('button#submitButton').click();
    
        cy.contains("Sucesso!").should("be.visible");
        cy.contains("Seu recurso foi editado.").should("be.visible");
    });
});
