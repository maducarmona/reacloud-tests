// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
    // Mock the Google OAuth flow 
    cy.intercept('POST', 'https://accounts.google.com/*', {
        statusCode: 200,
        body: {
            access_token: 'mock-access-token',
            expires_in: 3600,
            token_type: 'Bearer'
        }
    }).as('googleOAuth');

    cy.visit('https://reacloud.duckdns.org/');
    cy.contains('ENTRE ').click();

    // Wait for the Google OAuth request to complete and capture the response
    cy.wait('@googleOAuth').then((interception) => {
        // Extract the mock token from the intercepted response
        const mockToken = interception.response.body.access_token;

        // Simulate setting the reaCloudSession token in localStorage
        cy.window().then((win) => {
            const reaCloudSession = JSON.stringify({ jwt_token: mockToken }); 
            win.localStorage.setItem('reaCloudSession', reaCloudSession); 
        });
        // Manually set isLoggedIn to true
        win.localStorage.setItem('isLoggedIn', 'true');
    });

    // Verify that the user is logged in
    cy.window().then((win) => {
        const isLoggedIn = win.localStorage.getItem('isLoggedIn');
        expect(isLoggedIn).to.equal('true'); 
    });

    // Additional verification 
    cy.contains('MEU PERFIL').should('exist');
});