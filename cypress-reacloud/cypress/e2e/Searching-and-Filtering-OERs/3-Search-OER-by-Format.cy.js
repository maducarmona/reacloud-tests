describe('Search OER by Format', () => {
    it('Verify that users can filter OERs based on material formats compatible with the BNCC (Base Nacional Comum Curricular) guidelines.', () => {
        cy.visit('/');
        cy.contains('span','TIPO DO MATERIAL');
        cy.get('#2').click();          

        cy.get('ul[class*="dropDownList"]').within(() => {
            cy.contains('li', 'Todos').should('exist').should('be.visible');
            cy.contains('li', 'Sites ou Materiais Online').should('exist').should('be.visible');
            cy.contains('li', 'Textual').should('exist').should('be.visible');
            cy.contains('li', 'Visual ou Multimídia').should('exist').should('be.visible');
            cy.contains('li', 'Recursos Interativos e Digitais').should('exist').should('be.visible');
            cy.contains('li', 'Áudio').should('exist').should('be.visible');

            cy.contains('li', 'Sites ou Materiais Online').click();
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
                    
                    cy.get('li').contains('strong', 'Tipo do Material:').parent()
                        .should('contain', 'Sites ou Materiais Online')
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