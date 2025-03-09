describe("3 - Add a resource from a Youtube Video via the extension (Full Compatibility)", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Verify that users can extract a resource's metadata through the extension on a fully compatible site.", () => {
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

    cy.contains("Youtube Resource")
      .should("be.visible")
      .parent()
      .parent()
      .within(() => {
        cy.contains("ADICIONAR").click();
      });

    cy.wait(1000);
    cy.get('input#title').should('not.have.value', '');
    cy.get("input#contributor").should('not.have.value', '');
    cy.get("input#source").should('not.have.value', '');
    cy.get("input#creator").should('not.have.value', '');
    cy.get("input#publisher").should('not.have.value', '');
    cy.get("input#coverage").should('not.have.value', '');
    cy.get("input#date").should('not.have.value', '');
    cy.get("input#description").should('not.have.value', '');
    cy.get('div[class*="cornerUpload"]').within(() => {
        cy.get('img').should('have.attr', 'src').and('not.be.empty');
    });
    cy.get("#1").within(() => {
      cy.get("span").should("have.text");
    });
    cy.get("#2").within(() => {
      cy.get("span").should("have.text");
    });
    cy.get("#3").within(() => {
      cy.get("span").should("have.text", "Possui direitos autorais");
    });
    cy.get("#4").within(() => {
      cy.get("span").should("have.text");
    });
    cy.get("#5").within(() => {
      cy.get("span").should("have.text", "Visual ou Multimídia");
    });
    cy.get("#6").within(() => {
      cy.get("span").should("have.text", "Outro");
    });
  });
});
