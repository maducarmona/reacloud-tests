describe('Edit a posted OER', () => {
    beforeEach(() => {
      cy.login(); // Ensure the user is logged in
    });
  
    it('should allow the user to edit a posted OER', () => {
      cy.visit('/');
      cy.contains('ADICIONAR RECURSO').click();
      cy.contains('EDITAR RECURSO').click();
      // Locate the container that holds both the title and the "EDITAR" button
        cy.contains('h1', 'Sample OER Title').parent().parent().within(() => {
        cy.contains('EDITAR').click();
      });
  
      // Verify that the metadata displayed in the index matches the submitted data
      const originalMetadata = {
        title: 'Sample OER Title',
        contributor: 'John Doe',
        type: 'Visual ou Multimídia', 
        source: 'https://example.com',
        audience: 'Geral', 
        creator: 'Jane Doe',
        publisher: 'Sample Publisher',
        image: 'image.jpg', 
        language: 'Português',
        format: 'PDF',
        subject: 'Linguagens', 
        rights: 'Acesso Aberto', 
        coverage: 'Global',
        date: '2025-02-05',
        description: 'This is a sample OER description.',
        instructionalMethod: 'Use this resource for educational purposes.',
      };
  
      cy.get('input#title').should('have.value', originalMetadata.title);
      cy.get('input#contributor').should('have.value', originalMetadata.contributor);
      cy.get('input#source').should('have.value', originalMetadata.source);
      cy.get('input#creator').should('have.value', originalMetadata.creator);
      cy.get('input#publisher').should('have.value', originalMetadata.publisher);
      cy.get('input#coverage').should('have.value', originalMetadata.coverage);
      cy.get('input#date').should('have.value', originalMetadata.date);
      cy.get('input#description').should('have.value', originalMetadata.description);
      cy.get('textarea#instructionalMethod').should('have.value', originalMetadata.instructionalMethod);
      cy.get('#1').within(() => {
        cy.get('span').should('have.text', originalMetadata.audience);
      });
      cy.get('#2').within(() => {
        cy.get('span').should('have.text', originalMetadata.subject);
      });
      cy.get('#3').within(() => {
        cy.get('span').should('have.text', originalMetadata.rights);
      });
      cy.get('#4').within(() => {
        cy.get('span').should('have.text', originalMetadata.language);
      });
      cy.get('#5').within(() => {
        cy.get('span').should('have.text', originalMetadata.type);
      });
      cy.get('#6').within(() => {
        cy.get('span').should('have.text', originalMetadata.format);
      });

      // Change one of the fields
      const updatedMetadata = {
        ...originalMetadata,
        title: 'Updated OER Title',
        contributor: 'New Jane Doe',
        type: 'Sites ou Materiais Online', 
        source: 'https://newexample.com',
        audience: 'Ensino Fundamental', 
        creator: 'Jane Doe',
      };
  
      cy.get('input#title').clear().type(updatedMetadata.title);
      cy.get('input#contributor').clear().type(updatedMetadata.contributor);
      cy.get('#5').click(); 
      cy.contains(updatedMetadata.type).click(); 
      cy.get('input#source').clear().type(updatedMetadata.source);
      cy.get('#1').click(); 
      cy.contains(updatedMetadata.audience).click(); 
      cy.get('input#creator').clear().type(updatedMetadata.creator);
      cy.get('input#publisher').clear().type(updatedMetadata.publisher);

      // Save the resource
      cy.get('button#submitButton').click();
  
      //Verify listed EOR is not the original one
      cy.visit('/');
      cy.get('input[placeholder="O que você procura?"]').click().type(updatedMetadata.title);
      cy.contains('button', 'BUSCAR').click();
      cy.contains(updatedMetadata.title).click();

      // Verify that the indexed OER matches the updated metadata fields
      cy.contains(updatedMetadata.title).should('exist'); 
      cy.contains(updatedMetadata.contributor).should('exist'); 
      cy.contains(updatedMetadata.type).should('exist'); 
      cy.contains(updatedMetadata.source).should('exist'); 
      cy.contains(updatedMetadata.audience).should('exist'); 
      cy.contains(updatedMetadata.creator).should('exist'); 
      cy.contains(updatedMetadata.publisher).should('exist'); 
      cy.contains(updatedMetadata.language).should('exist'); 
      cy.contains(updatedMetadata.format).should('exist'); 
      cy.contains(updatedMetadata.subject).should('exist'); 
      cy.contains(updatedMetadata.rights).should('exist'); 
      cy.contains(updatedMetadata.coverage).should('exist'); 
      cy.contains(updatedMetadata.date).should('exist'); 
      cy.contains(updatedMetadata.description).should('exist'); 
      cy.contains(updatedMetadata.instructionalMethod).should('exist');
    });
  });