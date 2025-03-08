describe("No Filter or Search", () => {
    it("Verify that users can see all listed OERs when no filter is applied.", () => {
        cy.visit('/');
        cy.contains('button', 'BUSCAR').click();

        // Expected Result: A filtered list of OERs matching the search term should be displayed
        cy.get('div[class*="reaContainer"]').should('exist').should('be.visible');
        cy.get('div[class*="contentContainer"]').should('have.length.gt', 0)
    });
});