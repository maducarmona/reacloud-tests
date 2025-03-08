const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', 
    browser: 'chrome',
    viewportWidth: 1920,
    viewportHeight: 1080,
    screenshotOnRunFailure: true, // Default: takes a screenshot on failure
    video: false, // (Optional) Disable videos if you only want screenshots
    setupNodeEvents(on, config) {
      // Take a screenshot after each test, regardless of pass/fail
      on('after:spec', (spec, results) => {
        if (results && results.tests) {
          results.tests.forEach((test) => {
            if (test.state === 'passed') {
              cy.screenshot(`passed-${spec.name}-${test.title}`);
            }
          });
        }
      });
    },
  },
});