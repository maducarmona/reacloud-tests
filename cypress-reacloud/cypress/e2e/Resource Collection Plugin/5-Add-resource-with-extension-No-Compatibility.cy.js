describe("5 - Add a resource from a Google Drive PDF via the extension (No Disclosed Compatibility)", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Verify that users can add a resource to the plugin even when metadata extraction is unavailableQW.", () => {
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

    cy.contains("GDrive Resource")
      .should("be.visible")
      .parent()
      .parent()
      .within(() => {
        cy.contains("ADICIONAR").click();
      });

    cy.wait(1000);

    cy.get("input#source").should("not.have.value", "");

    cy.get("input#title").should("have.value", "");
    cy.get("input#contributor").should("have.value", "");
    cy.get("input#source").should("have.value", "");
    cy.get("input#creator").should("have.value", "");
    cy.get("input#publisher").should("have.value", "");
    cy.get("input#coverage").should("have.value", "");
    cy.get("input#date").should("have.value", "");
    cy.get("input#description").should("have.value", "");
    cy.get('div[class*="cornerUpload"]').within(() => {
      cy.get("img").should("not.have.attr", "src").and("be.empty");
    });
    cy.get("#1").within(() => {
      cy.get("span").should("have.text");
    });
    cy.get("#2").within(() => {
      cy.get("span").should("have.text");
    });
    cy.get("#3").within(() => {
      cy.get("span").should("have.text");
    });
    cy.get("#4").within(() => {
      cy.get("span").should("have.text");
    });
    cy.get("#5").within(() => {
      cy.get("span").should("have.text");
    });
    cy.get("#6").within(() => {
      cy.get("span").should("have.text");
    });
  });
});
