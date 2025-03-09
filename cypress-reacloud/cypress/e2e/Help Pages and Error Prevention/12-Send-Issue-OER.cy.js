describe('12 - Send an Issue About an OER', () => {
  
    it('Verify that users can report an issue about an OER - Success Notification', () => {
        cy.login();
        cy.visit('/'); 
        cy.contains('button', 'BUSCAR').click();

        cy.wait(2000);
  
        cy.get('div[class*="reaContainer"]').should('exist').should('be.visible');
        cy.get('div[class*="contentContainer"]').should('exist');

        cy.get('div[class*="contentContainer"]').eq(0).click();

        cy.contains('Informar um Problema').should('exist').should('be.visible').click();

        cy.contains('Por favor, informe qual o problema com o recurso.').should('exist').should('be.visible');
        cy.get('div[class*="modalContainer"]').within(() => {
            cy.get('textarea').type('This is a test issue report!');
            cy.contains('button', 'CANCELAR').should('exist').should('be.visible');
            cy.contains('button', 'ENVIAR').should('exist').should('be.visible').click();
        });

        cy.contains('Sucesso!').should('exist').should('be.visible');
        cy.contains('Seu problema foi enviado.').should('exist').should('be.visible');
    });

    it('Verify that users can report an issue about an OER - Error Notification', () => {
        cy.login();
        cy.visit('/'); 
        cy.contains('button', 'BUSCAR').click();

        cy.wait(2000);
  
        cy.get('div[class*="reaContainer"]').should('exist').should('be.visible');
        cy.get('div[class*="contentContainer"]').should('exist');

        cy.get('div[class*="contentContainer"]').eq(0).click();

        cy.contains('Informar um Problema').should('exist').should('be.visible').click();

        cy.intercept('POST', /\/api\/recurso\/\d+\/report/, {
            statusCode: 500,
            body: { message: "Internal Server Error" },
          }).as('sendReaIssueError');

        cy.contains('Por favor, informe qual o problema com o recurso.').should('exist').should('be.visible');
        cy.get('div[class*="modalContainer"]').within(() => {
            cy.get('textarea').type('This is a test issue report!');
            cy.contains('button', 'CANCELAR').should('exist').should('be.visible');
            cy.contains('button', 'ENVIAR').should('exist').should('be.visible').click();
        });

        cy.wait('@sendReaIssueError');

        cy.contains('Erro ao enviar problema.').should('exist').should('be.visible');
        cy.contains('Verifique a sua conexão e tente novamente.').should('exist').should('be.visible');

    });

    it('Verify that users can report an issue about an OER - Login Notification', () => {
        cy.visit('/'); 
        cy.contains('button', 'BUSCAR').click();

        cy.wait(2000);
  
        cy.get('div[class*="reaContainer"]').should('exist').should('be.visible');
        cy.get('div[class*="contentContainer"]').should('exist');

        cy.get('div[class*="contentContainer"]').eq(0).click();

        cy.contains('Informar um Problema').should('exist').should('be.visible').click();

        cy.contains('Erro ao enviar problema.').should('exist').should('be.visible');
        cy.contains('Você precisa estar logado para enviar um problema.').should('exist').should('be.visible');

    });
});