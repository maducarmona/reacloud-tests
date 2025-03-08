describe('Search OER by Title', () => {
    it('Verify that users can search for OERs by entering their title in the search bar', () => {
        cy.visit('/');
        cy.get('input[placeholder="O que você procura?"]').click().type('Updated OER Title');
        cy.contains('button', 'BUSCAR').click();

        // Expected Result: A filtered list of OERs matching the search term should be displayed
        cy.get('div[class*="reaContainer"]').should('contain', 'Updated OER Title');
        cy.contains('h1', 'Updated OER Title').click();
        cy.contains('Updated OER Title').should('exist'); 
    });
});