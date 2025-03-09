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
import 'cypress-file-upload';

Cypress.Commands.add('login', () => {
    cy.visit('/');

    // Mock the authentication-related API calls
    cy.intercept('POST', '/api/auth/checkToken', {
        statusCode: 200,
        body: { valid: true } // Simulate a successful token validation
    }).as('checkToken');


    // Simulate setting the authentication token in localStorage
    cy.window().then((win) => {
        // This has to be a real token for the API to accept it
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNTIyMjU0NzgxMDkzMTA0MTg2MSIsIm5hbWUiOiJNYXJpYSBFZHVhcmRhIENhcm1vbmEiLCJlbWFpbCI6ImVkdWFyZGFjYXJtb25hQGdtYWlsLmNvbSIsImlhdCI6MTc0MTUzODI2OCwiZXhwIjoxNzQxNzk3NDY4fQ.foyclAToT964WCuzJK2slWh1x1u4Eu-n1K1rdyfTRHk';
        const reaCloudSession = JSON.stringify({ jwt_token: token });

        
        win.localStorage.setItem('reaCloudSession', reaCloudSession);
        win.localStorage.setItem('isLoggedIn', 'true');
    });

    // Reload the page to apply the authentication state
    cy.reload();

    // Wait for the intercepted API calls
    cy.wait('@checkToken');

    // Verify that the user is logged in
    cy.window().then((win) => {
        const isLoggedIn = win.localStorage.getItem('isLoggedIn');
        expect(isLoggedIn).to.equal('true');
    });

    // Ensure the UI updates correctly
    cy.contains('MEU PERFIL').should('exist');
});