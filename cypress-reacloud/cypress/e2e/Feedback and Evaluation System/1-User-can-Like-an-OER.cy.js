describe('User can Like an OER', () => {
    beforeEach(() => {
        cy.login(); 
    });
  
    it('users can add a "like" to an OER', () => {
        cy.visit('/'); 
        cy.contains('button', 'BUSCAR').click();

        cy.wait(2000);
  
        cy.get('div[class*="reaContainer"]').should('exist').should('be.visible');
        cy.get('div[class*="contentContainer"]').should('exist');

        cy.get('div[class*="contentContainer"]').eq(0).within(() => {
            cy.get('img[alt="Joinha"]').click();
            cy.wait(1000);
            cy.get('button[class*="socialButton"][class*="likedButton"]').should('exist');
        });

        // Now verify if like button is still active
        cy.get('div[class*="contentContainer"]').eq(0).click();
        cy.get('button[class*="socialButton"][class*="likedButton"]').should('exist');

        cy.go('back');

        // Now verify if like button works directly on the OER page
        cy.get('div[class*="contentContainer"]').eq(2).click();
        cy.get('img[alt="Joinha"]').click();
        cy.get('button[class*="socialButton"][class*="likedButton"]').should('exist');
    });
  });