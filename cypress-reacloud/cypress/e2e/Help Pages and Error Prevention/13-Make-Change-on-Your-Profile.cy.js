describe('13 - Make a Change on Your Profile', () => {
    beforeEach(() => {
      cy.login(); // Ensure the user is logged in
    });
  
    it('Verify that users can update their profile information. - Success Notification', () => {
      cy.visit('/'); 
      cy.contains('MEU PERFIL').click(); 

      cy.get('div[class*="inputWithButton"]').eq(0).within(() => {
        cy.get('button').click();
      });

      cy.get('input[name="given_name"]').clear().type('Teste');
      cy.get('input[name="family_name"]').clear().type('Teste Family');
      cy.get('input[name="institution"]').clear().type('Teste Institution');
      cy.get('input[name="profile"]').clear().type('Teste Profile');

      cy.get('button[type="submit"]').click();

      cy.contains('Dados salvos com sucesso!').should('be.visible');
      cy.contains('Seu perfil foi atualizado.').should('be.visible');
              
    });  

    it('Verify that users can update their profile information. - Error Notification', () => {
        cy.visit('/'); 
        cy.contains('MEU PERFIL').click(); 
  
        cy.get('div[class*="inputWithButton"]').eq(0).within(() => {
          cy.get('button').click();
        });
  
        cy.get('input[name="given_name"]').clear().type('Teste Error');
        cy.get('input[name="family_name"]').clear().type('Teste Family Error');
        cy.get('input[name="institution"]').clear().type('Teste Institution Error');
        cy.get('input[name="profile"]').clear().type('Teste Profile Error');

        cy.intercept('PUT', /\/api\/users\/.*/, {
            statusCode: 500,
            body: { message: "Internal Server Error" },
          }).as('updateUserError');
  
        cy.get('button[type="submit"]').click();

        cy.wait('@updateUserError');
  
        cy.contains('Erro ao salvar os dados').should('be.visible');
        cy.contains('Por favor, tente novamente.').should('be.visible');
                
      });  
      
  });