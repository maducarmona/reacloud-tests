describe('Search OER by Title', () => {
    it('Verify that users can search for OERs by entering their title in the search bar', () => {
        cy.visit('/');
        cy.get('input[placeholder="O que você procura?"]').click().type('OER for testing 1');
        cy.contains('button', 'BUSCAR').click();

        // Expected Result: A filtered list of OERs matching the search term should be displayed
        cy.get('div[class*="reaContainer"]').should('contain', 'OER for testing 1');
        cy.contains('h1', 'OER for testing 1').click();
        cy.contains('OER for testing 1').should('exist'); 
    });
});