describe('Search OER by Knowledge Area', () => {
    it('Verify that users can filter OERs based on BNCC (Base Nacional Comum Curricular) knowledge areas.', () => {
        cy.visit('/');
        cy.contains('span','ÁREA DO CONHECIMENTO');
        cy.get('#1').click();          

        cy.get('ul[class*="dropDownList"]').within(() => {
            cy.contains('li', 'Todos').should('exist').should('be.visible');
            cy.contains('li', 'Linguagens').should('exist').should('be.visible');
            cy.contains('li', 'Matemática').should('exist').should('be.visible');
            cy.contains('li', 'Ciências da Natureza').should('exist').should('be.visible');
            cy.contains('li', 'Ciências Humanas').should('exist').should('be.visible');
            cy.contains('li', 'Ensino Religioso').should('exist').should('be.visible');

            cy.contains('li', 'Linguagens').click();
        });

        cy.contains('button', 'BUSCAR').click();

        // Wait for page to stabilize and ensure containers are fully loaded
        cy.wait(2000);
        
        cy.get('div[class*="contentContainer"]')
            .should('have.length.gt', 0) // Ensure we have at least one container
            .then($containers => {
                const containerCount = $containers.length;
                cy.log(`Found ${containerCount} containers`);
                
                // Create a recursive function to check each container
                const checkContainer = (index) => {
                    if (index >= containerCount) {
                        // Base case: we've checked all containers
                        return;
                    }
                    
                    cy.log(`Checking container ${index + 1} of ${containerCount}`);
                    
                    // Make sure all containers are still present
                    cy.get('div[class*="contentContainer"]')
                        .should('have.length', containerCount)
                        .eq(index)
                        .should('be.visible')
                        .click();
                    
                    // Check if an <li> with '<strong>Área do conhecimento:</strong> "Linguagens"' exists and is visible
                    cy.get('li').contains('strong', 'Área do conhecimento:').parent()
                        .should('contain', 'Linguagens')
                        .should('be.visible');
                    
                    cy.go('back').then(() => {
                        cy.wait(1000); // Add a short wait to ensure page is loaded
                        cy.get('div[class*="contentContainer"]')
                            .should('have.length', containerCount)
                            .should('be.visible');
                            
                        checkContainer(index + 1);
                    });
                };
                
                // Start checking containers from index 0
                checkContainer(0);
            });
    });
});