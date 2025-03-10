describe("4 - Add OER With an Account", () => {
    beforeEach(() => {
        cy.login(); 
    });

    it("Verify that users with an account can successfully add an OER.", () => {
      cy.visit("/");
      cy.contains("ADICIONAR RECURSO").click();
      cy.contains("ADICIONAR NOVOS RECURSOS").click();
      cy.contains("ADICIONAR RECURSO PRÓPRIO").click();
  
      cy.get('input[name="title"]').type("Notification OER Title");
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
      
      cy.contains('Dados salvos com sucesso!').should('be.visible');
      cy.contains("Seu recurso foi salvo.").should('be.visible');
    });
  });
  