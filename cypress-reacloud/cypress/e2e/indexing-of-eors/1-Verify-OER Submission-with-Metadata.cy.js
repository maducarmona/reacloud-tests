describe('OER Submission with Metadata', () => {
  beforeEach(() => {
      cy.login(); 
  });

  it('should submit OER through the Home Page', () => {
      cy.visit('/'); // Navigate to the portal's homepage
      cy.contains('ADICIONAR RECURSO').click(); // Click the ADICIONAR RECURSO button
      cy.contains('ADICIONAR NOVOS RECURSOS').click(); // Click the ADICIONAR NOVOS RECURSOS button
      cy.contains('ADICIONAR RECURSO PRÓPRIO').click(); // Click the ADICIONAR RECURSO PRÓPRIO button

    // Fill in the required fields in the OER form
    const oerMetadata = {
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

    // Fill in the form fields
    cy.get('input[name="title"]').type(oerMetadata.title); // Title
    cy.get('input[name="contributor"]').type(oerMetadata.contributor); // Contributor
    cy.get('#5').click(); // O ID PARA O TIPO ESTÁ EM NUMERO
    cy.contains(oerMetadata.type).click(); // Select the Type
    cy.get('input[name="source"]').type(oerMetadata.source); // Source
    cy.get('#1').click(); // O ID PARA O público alvo ESTÁ EM NUMERO
    cy.contains(oerMetadata.audience).click(); // Select the Audience
    cy.get('input[name="creator"]').type(oerMetadata.creator); // Creator
    cy.get('input[name="publisher"]').type(oerMetadata.publisher); // Publisher

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
    cy.get('input[name="coverage"]').type(oerMetadata.coverage); // Coverage
    cy.get('input[name="date"]').type(oerMetadata.date); // Date
    cy.get('input[name="description"]').type(oerMetadata.description); // Description
    cy.get('textarea[name="instructionalMethod"]').type(oerMetadata.instructionalMethod); // Instructional Method

    // Submit the OER
    cy.get('button#submitButton').click();


    // Expected Result: Verify all submitted metadata
    cy.contains(oerMetadata.title).should('exist'); // Title
    cy.contains(oerMetadata.contributor).should('exist'); // Contributor
    cy.contains(oerMetadata.type).should('exist'); // Type
    cy.contains(oerMetadata.source).should('exist'); // Source
    cy.contains(oerMetadata.audience).should('exist'); // Audience
    cy.contains(oerMetadata.creator).should('exist'); // Creator
    cy.contains(oerMetadata.publisher).should('exist'); // Publisher
    cy.contains(oerMetadata.language).should('exist'); // Language
    cy.contains(oerMetadata.format).should('exist'); // Format
    cy.contains(oerMetadata.subject).should('exist'); // Subject
    cy.contains(oerMetadata.rights).should('exist'); // Rights
    cy.contains(oerMetadata.coverage).should('exist'); // Coverage
    cy.contains(oerMetadata.date).should('exist'); // Date
    cy.contains(oerMetadata.description).should('exist'); // Description
    cy.contains(oerMetadata.instructionalMethod).should('exist'); // Instructional Method
  });
});