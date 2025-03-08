describe('Verify OER Submission Blocked for Unauthenticated User', () => {
    it('should not allow unauthenticated user to submit OER', () => {
        cy.visit('/'); 
        cy.contains('ADICIONAR RECURSO').click();
        cy.contains('ADICIONAR NOVOS RECURSOS').click(); 
        cy.contains('ADICIONAR RECURSO PRÓPRIO').click(); 
        
    const oerMetadata = {
        title: 'NON EXISTENT OER',
        contributor: 'Johnny Doe',
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
  
      // Fill in the form fields
      cy.get('input[name="title"]').type(oerMetadata.title); 
      cy.get('input[name="contributor"]').type(oerMetadata.contributor); 
      cy.get('#5').click(); // O ID PARA O TIPO ESTÁ EM NUMERO
      cy.contains(oerMetadata.type).click(); // Select the Type
      cy.get('input[name="source"]').type(oerMetadata.source); 
      cy.get('#1').click(); // O ID PARA O público alvo ESTÁ EM NUMERO
      cy.contains(oerMetadata.audience).click(); // Select the Audience
      cy.get('input[name="creator"]').type(oerMetadata.creator); 
      cy.get('input[name="publisher"]').type(oerMetadata.publisher); 
  
      // Upload Image
      cy.fixture(oerMetadata.image, 'base64').then((fileContent) => {
        const blob = Cypress.Blob.base64StringToBlob(fileContent, 'image/jpeg');
        const file = new File([blob], oerMetadata.image, { type: 'image/jpeg' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        cy.get('input[id="imgpath"]').then((input) => {
          input[0].files = dataTransfer.files;
          input[0].dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
  
      cy.get('#4').click(); // O ID PARA A LINGUAGEM ESTÁ EM NUMERO
      cy.contains(oerMetadata.language).click(); // Select the Language
      cy.get('#6').click(); // O ID PARA O FORMATO ESTÁ EM NUMERO
      cy.contains(oerMetadata.format).click(); // Select the Format
      cy.get('#2').click(); // O ID PARA A ÁREA DO CONHECIMENTO ESTÁ EM NUMERO
      cy.contains(oerMetadata.subject).click(); // Select the Subject
      cy.get('#3').click(); // O ID PARA A LICENSA ESTÁ EM NUMERO
      cy.contains(oerMetadata.rights).click(); // Select the Rights
      cy.get('input[name="coverage"]').type(oerMetadata.coverage); 
      cy.get('input[name="date"]').type(oerMetadata.date); 
      cy.get('input[name="description"]').type(oerMetadata.description); 
      cy.get('textarea[name="instructionalMethod"]').type(oerMetadata.instructionalMethod); 
  
      // Submit the OER
      cy.get('button#submitButton').click();

      // Verify that an error message appears
      cy.contains('Você não está logado.').should('be.visible'); 

      //Verify OER is not listed
      cy.visit('/');
      cy.get('input[placeholder="O que você procura?"]').click().type(oerMetadata.title);
      cy.contains('button', 'BUSCAR').click();
      cy.contains('h1', oerMetadata.title).should('not.exist');
    });
});
