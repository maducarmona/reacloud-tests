describe('2 - No Reminder About the Extension if Installed ', { env: { useExtensionProfile: true } }, () => {
    it('VVerify that users with the extension installed do not receive a message about the extension.', () => {
        cy.visit('/'); 
        cy.wait(2000);
        cy.contains(' Experimente a Mochila ReaCloud ').should('not.exist');
    });
});