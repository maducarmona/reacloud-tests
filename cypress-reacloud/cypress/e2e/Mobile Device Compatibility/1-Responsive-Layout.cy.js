describe("1 - Responsive Layout", () => {
  const viewports = [
    { width: 320, height: 480 }, // Smallest phones
    { width: 375, height: 667 }, // iPhone 6/7/8
    { width: 768, height: 1024 }, // Tablets
    { width: 1440, height: 900 }, // Desktops
  ];

  viewports.forEach((viewport) => {
    it(`home page should display correctly on ${viewport.width}x${viewport.height}`, () => {
      cy.viewport(viewport.width, viewport.height);
      cy.visit("/");

      cy.get("header").should("be.visible");
      cy.get('div[class*="container"]').should("be.visible");
      cy.get('div[class="mainPageRef"]').should("be.visible");
      cy.get('div[class*="help"]').should("be.visible");

      cy.contains("button", "BUSCAR").click();

      cy.get("header").should("be.visible");
      cy.get('div[class*="container"]').should("be.visible");
      cy.get('div[class*="help"]').should("be.visible");
    });

    it(`addrea page should display correctly on ${viewport.width}x${viewport.height}`, () => {
      cy.visit("/addrea");

      cy.get("header").should("be.visible");
      cy.get('div[class*="container"]').should("be.visible");
      cy.get('div[class*="help"]').should("be.visible");

      cy.get('div[class*="addNewReaContainer"]')
        .should("be.visible") // Ensure the div is visible within the viewport

        // Check the div's width and height to ensure it's not too large
        .then(($div) => {
          const divWidth = $div[0].clientWidth;
          const divHeight = $div[0].clientHeight;

          // Get the viewport size
          cy.window().then((win) => {
            const viewportWidth = win.innerWidth;
            const viewportHeight = win.innerHeight;

            // Assert that the div is not bigger than the viewport
            expect(divWidth).to.be.lessThan(
              viewportWidth,
              "Div width is within the viewport"
            );
            expect(divHeight).to.be.lessThan(
              viewportHeight,
              "Div height is within the viewport"
            );
          });
        });

      cy.get('div[class*="editReaContainer"]')
        .should("be.visible") // Ensure the div is visible within the viewport

        // Check the div's width and height to ensure it's not too large
        .then(($div) => {
          const divWidth = $div[0].clientWidth;
          const divHeight = $div[0].clientHeight;

          // Get the viewport size
          cy.window().then((win) => {
            const viewportWidth = win.innerWidth;
            const viewportHeight = win.innerHeight;

            // Assert that the div is not bigger than the viewport
            expect(divWidth).to.be.lessThan(
              viewportWidth,
              "Div width is within the viewport"
            );
            expect(divHeight).to.be.lessThan(
              viewportHeight,
              "Div height is within the viewport"
            );
          });
        });
    });

    it(`pluginreas page should display correctly on ${viewport.width}x${viewport.height}`, () => {
      cy.visit("/pluginreas");

      cy.get("header").should("be.visible");
      cy.get('div[class*="help"]').should("be.visible");

      cy.get('div[class*="container"]')
        .should("be.visible") // Ensure the div is visible within the viewport

        // Check the div's width and height to ensure it's not too large
        .then(($div) => {
          const divWidth = $div[0].clientWidth;
          const divHeight = $div[0].clientHeight;

          // Get the viewport size
          cy.window().then((win) => {
            const viewportWidth = win.innerWidth;
            const viewportHeight = win.innerHeight;

            // Assert that the div is not bigger than the viewport
            expect(divWidth).to.be.lessThan(
              viewportWidth,
              "Div width is within the viewport"
            );
            expect(divHeight).to.be.lessThan(
              viewportHeight,
              "Div height is within the viewport"
            );
          });
        });
    });

    it(`reaeditadd page should display correctly on ${viewport.width}x${viewport.height}`, () => {
      cy.visit("/reaeditadd");

      cy.get("header").should("be.visible");
      cy.get('div[class*="help"]').should("be.visible");

      cy.get("form#reaconfig")
        .should("be.visible")
        .then(($div) => {
          const divWidth = $div[0].clientWidth;
          const divHeight = $div[0].clientHeight;

          // Get the viewport size
          cy.window().then((win) => {
            const viewportWidth = win.innerWidth;
            const viewportHeight = win.innerHeight;

            // Assert that the div is not bigger than the viewport
            expect(divWidth).to.be.lessThan(
              viewportWidth,
              "Div width is within the viewport"
            );
            expect(divHeight).to.be.lessThan(
              viewportHeight,
              "Div height is within the viewport"
            );
          });
        });
    });

    it(`postedreaedit page should display correctly on ${viewport.width}x${viewport.height}`, () => {
      cy.visit("/editpostedreas");

      cy.get("header").should("be.visible");
      cy.get('div[class*="help"]').should("be.visible");

      cy.get('div[class*="container"]')
        .should("be.visible") // Ensure the div is visible within the viewport

        // Check the div's width and height to ensure it's not too large
        .then(($div) => {
          const divWidth = $div[0].clientWidth;
          const divHeight = $div[0].clientHeight;

          // Get the viewport size
          cy.window().then((win) => {
            const viewportWidth = win.innerWidth;
            const viewportHeight = win.innerHeight;

            // Assert that the div is not bigger than the viewport
            expect(divWidth).to.be.lessThan(
              viewportWidth,
              "Div width is within the viewport"
            );
            expect(divHeight).to.be.lessThan(
              viewportHeight,
              "Div height is within the viewport"
            );
          });
        });
    });

    it(`editpostedreas page should display correctly on ${viewport.width}x${viewport.height}`, () => {
      cy.visit("/postedreaedit/44");

      cy.get("header").should("be.visible");
      cy.get('div[class*="help"]').should("be.visible");

      cy.get("form#reaconfig")
        .should("be.visible") // Ensure the div is visible within the viewport

        // Check the div's width and height to ensure it's not too large
        .then(($div) => {
          const divWidth = $div[0].clientWidth;
          const divHeight = $div[0].clientHeight;

          // Get the viewport size
          cy.window().then((win) => {
            const viewportWidth = win.innerWidth;
            const viewportHeight = win.innerHeight;

            // Assert that the div is not bigger than the viewport
            expect(divWidth).to.be.lessThan(
              viewportWidth,
              "Div width is within the viewport"
            );
            expect(divHeight).to.be.lessThan(
              viewportHeight,
              "Div height is within the viewport"
            );
          });
        });
    });

    it(`ReaView page should display correctly on ${viewport.width}x${viewport.height}`, () => {
      cy.visit("/ReaView/44");

      cy.wait(1000);

      cy.get("header").should("be.visible");
      cy.get('div[class*="help"]').should("be.visible");
      cy.get('div[class*="reaViewContainer"]').should("be.visible");
      
      cy.get('div[class*="reaViewContent"]')
        .should("be.visible") // Ensure the div is visible within the viewport

        // Check the div's width and height to ensure it's not too large
        .then(($div) => {
          const divWidth = $div[0].clientWidth;
          const divHeight = $div[0].clientHeight;

          // Get the viewport size
          cy.window().then((win) => {
            const viewportWidth = win.innerWidth;
            const viewportHeight = win.innerHeight;

            // Assert that the div is not bigger than the viewport
            expect(divWidth).to.be.lessThan(
              viewportWidth,
              "Div width is within the viewport"
            );
            expect(divHeight).to.be.lessThan(
              viewportHeight,
              "Div height is within the viewport"
            );
          });
        });
    });

    it(`profile page should display correctly on ${viewport.width}x${viewport.height}`, () => {
      cy.visit("/profile");

      cy.wait(1000);

      

      cy.get("header").should("be.visible");
      cy.get('div[class*="help"]').should("be.visible");
      cy.get('div[class*="profilePicContainer"]').should("be.visible");
      cy.get('div[class*="containerForm"]').should("be.visible");



      cy.get('form[name="MeusDados"]')
        .should("be.visible") // Ensure the div is visible within the viewport

        // Check the div's width and height to ensure it's not too large
        .then(($div) => {
          const divWidth = $div[0].clientWidth;
          const divHeight = $div[0].clientHeight;

          // Get the viewport size
          cy.window().then((win) => {
            const viewportWidth = win.innerWidth;
            const viewportHeight = win.innerHeight;

            // Assert that the div is not bigger than the viewport
            expect(divWidth).to.be.lessThan(
              viewportWidth,
              "Div width is within the viewport"
            );
            expect(divHeight).to.be.lessThan(
              viewportHeight,
              "Div height is within the viewport"
            );
          });
        });
    });

    it(`help page should display correctly on ${viewport.width}x${viewport.height}`, () => {
      cy.visit('/help');

      cy.get('header').should('be.visible');
      cy.get('div[class*="helpContainer"]').should('be.visible');
    });
  });
});
