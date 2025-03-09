describe('1 - Get a Reminder About the Extension on the Site ', () => {
    it('Verify that users without the extension installed receive a message informing them about it.', () => {
        cy.visit('/'); 

        cy.contains(' Experimente a Mochila ReaCloud ').should('be.visible');
        cy.get('a')
          .should('have.attr', 'href', 'https://chromewebstore.google.com/detail/reacloud/flnllibpodbojpadpmpajmggfjchabdp')
          .should('be.visible');

        cy.get('img[alt="Fechar"]').click();
        cy.contains(' Experimente a Mochila ReaCloud ').should('not.exist');
    });
});