describe('2 - User can remove a Like from an OER', () => {
    beforeEach(() => {
        cy.login(); 
    });
  
    it('can remove a previously added "like" to an resource', () => {
        cy.visit('/'); 
        cy.contains('button', 'BUSCAR').click();

        cy.wait(2000);
  
        cy.get('div[class*="reaContainer"]').should('exist').should('be.visible');
        cy.get('div[class*="contentContainer"]').should('exist');

        cy.get('div[class*="contentContainer"]').eq(0).within(() => {
            cy.get('button[class*="socialButton"][class*="likedButton"]').should('exist');
            cy.get('img[alt="Joinha"]').click();
            cy.wait(1000);
            cy.get('button[class*="likedButton"]').should('not.exist');
        });

        // Now verify if like button is still active
        cy.get('div[class*="contentContainer"]').eq(0).click();
        cy.get('button[class*="likedButton"]').should('not.exist');
        cy.go('back');

        // Now verify if like button works directly on the OER page
        cy.get('div[class*="contentContainer"]').eq(2).click();
        cy.get('img[alt="Joinha"]').click();
        cy.get('button[class*="likedButton"]').should('not.exist');
    });
  });