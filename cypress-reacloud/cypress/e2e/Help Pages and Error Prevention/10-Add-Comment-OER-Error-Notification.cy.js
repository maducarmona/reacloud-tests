describe("10 - Add a Comment to an OER Error Notification", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Verify that users receive a notification when they try to comment and an error occurs. ", () => {
    cy.visit("/");
    cy.contains("button", "BUSCAR").click();

    cy.wait(2000);

    cy.get('div[class*="reaContainer"]').should("exist").should("be.visible");
    cy.get('div[class*="contentContainer"]').should("exist");

    cy.get('div[class*="contentContainer"]').eq(0).click();

    cy.get("textarea#commentTextArea").type("This is a test comment!");

    cy.intercept("POST", "/api/comments", {
      statusCode: 400,
      body: { error: true, message: 'Bad Request' },
    }).as("submitCommentError");

    cy.get('button[class*="submitButton"]').click();

    cy.wait("@submitCommentError");
    cy.contains("Falha ao tentar postar comentário.").should("be.visible");
    cy.contains("Tente novamente mais tarde.").should("be.visible");
  });
});
