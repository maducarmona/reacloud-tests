describe('5 - Verify Required Fields in OER Submission Form', () => {

    it('should enforce required fields before allowing submission', () => {
        cy.visit('/');
        cy.contains('ADICIONAR RECURSO').click();
        cy.contains('ADICIONAR NOVOS RECURSOS').click();
        cy.contains('ADICIONAR RECURSO PRÓPRIO').click();

        // Step 5: Click the Submit button without filling any fields
        cy.get('button#submitButton').click();

        // Step 6: Verify that validation messages are displayed for required fields
        cy.get('input[name="title"]').parent().find('p').should('be.visible').and('contain', 'Este campo é obrigatório');
        cy.get('input[name="source"]').parent().find('p').should('be.visible').and('contain', 'Este campo é obrigatório');
        cy.get('input[id="imgpath"]').parent().parent().find('p').should('be.visible').and('contain', 'Este campo é obrigatório');
        cy.get('input[name="date"]').parent().find('p').should('be.visible').and('contain', 'Este campo é obrigatório');
        cy.get('input[name="description"]').parent().find('p').should('be.visible').and('contain', 'Este campo é obrigatório');

        // Step 7: Fill in some, but not all required fields, and try submitting again
        cy.get('input[name="title"]').type('Sample OER Title');
        cy.get('input[name="source"]').type('https://example.com');
        cy.get('input[name="date"]').type('2025-02-05');
        cy.get('input[name="description"]').type('This is a sample OER description.');
        cy.get('button#submitButton').click();

        // Step 8: Verify that submission is still blocked due to missing required fields
        cy.get('input[id="imgpath"]').parent().parent().find('p').should('be.visible').and('contain', 'Este campo é obrigatório');
    });
});