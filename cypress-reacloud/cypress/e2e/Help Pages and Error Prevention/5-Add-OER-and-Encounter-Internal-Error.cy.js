describe("5 - Add OER and Encounter Internal Error", () => {
    beforeEach(() => {
        cy.login(); 
    });

    it("Verify that an appropriate message is displayed when there is an internal server error during OER addition.", () => {
      cy.visit("/");
      cy.contains("ADICIONAR RECURSO").click();
      cy.contains("ADICIONAR NOVOS RECURSOS").click();
      cy.contains("ADICIONAR RECURSO PRÓPRIO").click();
  
      cy.get('input[name="title"]').type("InternalError OER Title");
      cy.get('input[name="source"]').type("https://cats.com");
      cy.get('input[name="date"]').type("2025-01-10");
      cy.get('input[name="description"]').type(
        "This is a sample OER description."
      );
      cy.get("button#submitButton").click();
  
      // Upload Image
      cy.fixture('image.jpg', "base64").then((fileContent) => {
        const blob = Cypress.Blob.base64StringToBlob(fileContent, "image/jpeg");
        const file = new File([blob], 'image.jpg', { type: "image/jpeg" });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        cy.get('input[id="imgpath"]').then((input) => {
          input[0].files = dataTransfer.files;
          input[0].dispatchEvent(new Event("change", { bubbles: true }));
        });
      });
  
      cy.get('button#submitButton').click();
      
      cy.contains('Erro ao criar o recurso.').should('be.visible');
      cy.contains("Por favor, verifique sua conexão com a internet e tente novamente.").should('be.visible');
    });
  });
  