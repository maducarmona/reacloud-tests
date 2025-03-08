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

    cy.intercept('GET', '/api/users/uploadPhoto', {
        statusCode: 200,
    }).as('uploadPhoto');

    // Simulate setting the authentication token in localStorage
    cy.window().then((win) => {
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExNTIyMjU0NzgxMDkzMTA0MTg2MSIsIm5hbWUiOiJNYXJpYSBFZHVhcmRhIENhcm1vbmEiLCJlbWFpbCI6ImVkdWFyZGFjYXJtb25hQGdtYWlsLmNvbSIsImlhdCI6MTc0MTM4OTU2OCwiZXhwIjoxNzQxNjQ4NzY4fQ.eVB-sfQTQ3_QZ66b9DaaRte7-sHWklrA9bGj_NX21vg';
        const reaCloudSession = JSON.stringify({ jwt_token: mockToken });

        
        win.localStorage.setItem('reaCloudSession', reaCloudSession);
        win.localStorage.setItem('isLoggedIn', 'true');
    });

    // Reload the page to apply the authentication state
    cy.reload();

    // Wait for the intercepted API calls
    cy.wait('@checkToken');
    cy.wait('@uploadPhoto');

    // Verify that the user is logged in
    cy.window().then((win) => {
        const isLoggedIn = win.localStorage.getItem('isLoggedIn');
        expect(isLoggedIn).to.equal('true');

        // Base64 encoded 50x50 user avatar placeholder
        const profilePic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD8UlEQVR4nO2aS2xUVRjHf23pQFvagk0V0CKgJSZaH6iRSHz0ga+oiTxqAhEj7HThBheGjVrRGDWRFRoTNUbcgInRRDe6MdGFEIkWIvVBfCG2tGAZkM60M+1M5zPfmbmaYe7cO3c6d24dmi/5F/fMne+c//d995zvnAu5cuXKVdiaD5wB0nLZ3/FSVTL7gIGMOZAyH5JWAlGGnBmTZT4k2YY80m5DJluAL4G4xJuQ/a9TEfJ34KaZ/xLwLlDlVKQhyZpvwBbgY+AysAXoLmXyVuBJYK1TkYYkr6bBmvGJbAfeAmaJ+UngmMTOA47IMyEboDhKtmaaZJ8Ay+0+YD3wuyybvVJwGrGgPZysgbRk9sgz39l9QJuYfwbWAPeV3HTxtRJ4R54ZBp60c3IRE/sBvAG8AnRUxHLxdaMM1lF5Zg/QYudkXwabCHBE9s6mCtktTj4HrpP7NcCbwLiYnrXz0C1A1CrgvNivr4TlImuNfP+C3K8CXhcuBu9K1JGISYYMiP2tDtouhRqBQxmzYpt8+4zCY+0ChhQg0yp741JqvdiGxK575Liw66kCEtFCA+JQZAroFPuq/zcRvS+Mi20n8LcyEplz0FF5mWhV+nHrRqR/Sap356mtYuppTpE5ILYnSliOOqXfg9UQVg6hk7L5dwd96lM4/qRaInoqfaNcJm0a0FmgKhx2V1fdSI/S7+mqRvk65c/vHParvwa4X/5fo9Pfr3SMTEZ1al3tQX9NQy9b9b5i10PKxf4SdHuByOTU5yV4Ny6cv1a6vVVJJGGms9e4vY/0K92Vle8TjQvvl6S/JJCp7OX3kL6vyLM/ZXAfqwryRufREQVw88MkZ+ygY7ydw+7KLgdwr9iXYrnSQ7apRNfkCyTahGUScLvoVhMrlfdE0PN2JJhos9iGxbZBbLetIZh1KqHoDSIYpYRJnzSrJzi8PyK2S/K7T2y3rmDSp7UdKdWuvAa6oOdIa8hklJPfMuA7sdPF4EHpayKEiajXq6+AemJ+yRB0pTO4NeVwY6/kcPpLvJLN40uS2VOGzRg5PJDEvngQIk3AD2K/WUzzZP5gD/CdmPaHYP9plWJfbmY1CR+XSTNCJpFrlIG9U67EDje7OiveruxPvop9O/CzmDZLIO0pwO5zNeVflK9MlqdeRNukOnBDnvsFaJHf+VKLYiXfrSoR3UU/8DqwsITJFwIHZFr3W+1DUZmFSb8XGjCiMOqRA2BAc3fEjumFZCw7DpRDld6acqtM9i1d2E/6vZJnHTFPJP1eiDCV8CrGPIDoZNIvNjNJv1h5EeGKVRTwwiDb8jIVt5ZH+SLFtMi/9L9UKS1Sytdw/JLIDxetU9B0rsz7XLly5cqFpf8AySaaCEGGlhAAAAAASUVORK5CYII=';
        win.localStorage.setItem('profilePicture', profilePic);
    });

    // Ensure the UI updates correctly
    cy.contains('MEU PERFIL').should('exist');
});