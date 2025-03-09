describe('1 - Connect on the platform with Google', () => {
    beforeEach(() => {
        cy.login(); 
    });
  
    it('Verify that users can create an account in the platform.', () => {
        cy.visit('/'); 
        // Since the login function already deals with the login process, we can just check if the user is logged in.
        cy.contains('MEU PERFIL');
        cy.contains('ADICIONAR RECURSO'); 
    });
  });