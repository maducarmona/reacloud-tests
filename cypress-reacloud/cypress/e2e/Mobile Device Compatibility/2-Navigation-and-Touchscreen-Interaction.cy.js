describe("1 - Responsive Layout", () => {
  const viewport = { width: 320, height: 480 }; // Smallest phones;
  it(`home page should buttons`, () => {
    cy.viewport(viewport.width, viewport.height);
    cy.visit("/");

    cy.contains("ADICIONAR RECURSO").should("be.visible").click();

    cy.go("back");

    cy.contains(/ENTRE OU CADASTRE-SE/)
      .should("be.visible")
      .get('input[placeholder="O que você procura?"]')
      .should("be.visible")
      .type("Updated OER Title");

      cy.get('#1').click(); 

    cy.get('ul[class*="dropDownList"]').within(() => {
      cy.contains("li", "Todos").should("exist").should("be.visible");
      cy.contains("li", "Linguagens").should("exist").should("be.visible");
      cy.contains("li", "Matemática").should("exist").should("be.visible");
      cy.contains("li", "Ciências da Natureza")
        .should("exist")
        .should("be.visible");
      cy.contains("li", "Ciências Humanas")
        .should("exist")
        .should("be.visible");
      cy.contains("li", "Ensino Religioso")
        .should("exist")
        .should("be.visible");

      cy.contains("li", "Linguagens").click();
    });

    cy.get('#2').click(); 

    cy.get('ul[class*="dropDownList"]').within(() => {
      cy.contains("li", "Todos").should("exist").should("be.visible");
      cy.contains("li", "Sites ou Materiais Online")
        .should("exist")
        .should("be.visible");
      cy.contains("li", "Textual").should("exist").should("be.visible");
      cy.contains("li", "Visual ou Multimídia")
        .should("exist")
        .should("be.visible");
      cy.contains("li", "Recursos Interativos e Digitais")
        .should("exist")
        .should("be.visible");
      cy.contains("li", "Áudio").should("exist").should("be.visible");

      cy.contains("li", "Sites ou Materiais Online").click();
    });

    cy.contains("button", "BUSCAR").should("be.visible").click();
  });

  it(`addrea page`, () => {
    cy.viewport(viewport.width, viewport.height);
    cy.visit("/addrea");

    cy.get('div[class*="addNewReaContainer"]').should("be.visible").click();

    cy.go("back");

    cy.get('div[class*="editReaContainer"]').should("be.visible").click();
  });

  it(`pluginreas page`, () => {
    cy.viewport(viewport.width, viewport.height);
    cy.visit("/pluginreas");

    cy.get('button[class*="addOwnReaButton"]').should("be.visible").click();
  });

  it(`reaeditadd page`, () => {
    cy.login();
    cy.viewport(viewport.width, viewport.height);
    cy.visit("/reaeditadd");

    // Fill in the required fields in the OER form
    const oerMetadata = {
      title: "Sample OER Title",
      contributor: "John Doe",
      type: "Visual ou Multimídia",
      source: "https://example.com",
      audience: "Geral",
      creator: "Jane Doe",
      publisher: "Sample Publisher",
      image: "image.jpg",
      language: "Português",
      format: "PDF",
      subject: "Linguagens",
      rights: "Acesso Aberto",
      coverage: "Global",
      date: "2025-02-05",
      description: "This is a sample OER description.",
      instructionalMethod: "Use this resource for educational purposes.",
    };

    // Fill in the form fields
    cy.get('input[name="title"]').type(oerMetadata.title);
    cy.get('input[name="contributor"]').type(oerMetadata.contributor);
    cy.get("#5").click(); // O ID PARA O TIPO ESTÁ EM NUMERO
    cy.contains(oerMetadata.type).click(); // Select the Type
    cy.get('input[name="source"]').type(oerMetadata.source);
    cy.get("#1").click(); // O ID PARA O público alvo ESTÁ EM NUMERO
    cy.contains(oerMetadata.audience).click(); // Select the Audience
    cy.get('input[name="creator"]').type(oerMetadata.creator);
    cy.get('input[name="publisher"]').type(oerMetadata.publisher);

    // Upload Image
    cy.fixture(oerMetadata.image, "base64").then((fileContent) => {
      const blob = Cypress.Blob.base64StringToBlob(fileContent, "image/jpeg");
      const file = new File([blob], oerMetadata.image, { type: "image/jpeg" });
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      cy.get('input[id="imgpath"]').then((input) => {
        input[0].files = dataTransfer.files;
        input[0].dispatchEvent(new Event("change", { bubbles: true }));
      });
    });

    cy.get("#4").click(); // O ID PARA A LINGUAGEM ESTÁ EM NUMERO
    cy.contains(oerMetadata.language).click(); // Select the Language
    cy.get("#6").click(); // O ID PARA O FORMATO ESTÁ EM NUMERO
    cy.contains(oerMetadata.format).click(); // Select the Format
    cy.get("#2").click(); // O ID PARA A ÁREA DO CONHECIMENTO ESTÁ EM NUMERO
    cy.contains(oerMetadata.subject).click(); // Select the Subject
    cy.get("#3").click(); // O ID PARA A LICENSA ESTÁ EM NUMERO
    cy.contains(oerMetadata.rights).click(); // Select the Rights
    cy.get('input[name="coverage"]').type(oerMetadata.coverage);
    cy.get('input[name="date"]').type(oerMetadata.date);
    cy.get('input[name="description"]').type(oerMetadata.description);
    cy.get('textarea[name="instructionalMethod"]').type(
      oerMetadata.instructionalMethod
    );

    // Submit the OER
    cy.get("button#submitButton").click();

    // Expected Result: Verify all submitted metadata
    cy.contains(oerMetadata.title).should("exist");
    cy.contains(oerMetadata.contributor).should("exist");
    cy.contains(oerMetadata.type).should("exist");
    cy.contains(oerMetadata.source).should("exist");
    cy.contains(oerMetadata.audience).should("exist");
    cy.contains(oerMetadata.creator).should("exist");
    cy.contains(oerMetadata.publisher).should("exist");
    cy.contains(oerMetadata.language).should("exist");
    cy.contains(oerMetadata.format).should("exist");
    cy.contains(oerMetadata.subject).should("exist");
    cy.contains(oerMetadata.rights).should("exist");
    cy.contains(oerMetadata.coverage).should("exist");
    cy.contains(oerMetadata.date).should("exist");
    cy.contains(oerMetadata.description).should("exist");
    cy.contains(oerMetadata.instructionalMethod).should("exist");
  });

  it(`postedreaedit page`, () => {
    cy.login();
    cy.viewport(viewport.width, viewport.height);
    cy.visit("/editpostedreas");

    // Locate the container that holds both the title and the "EDITAR" button
    cy.contains("h1", "Sample OER Title")
      .eq(0)
      .parent()
      .parent()
      .within(() => {
        cy.get('img[alt="Figura de remoção"]').click();
      });

    cy.contains("Remover recurso").should("be.visible");
    cy.contains(/Você deseja remover o recurso/).should("be.visible");
    cy.contains("button", "CANCELAR").click();

    cy.contains("h1", "Sample OER Title")
      .eq(0)
      .parent()
      .parent()
      .within(() => {
        cy.get('img[alt="Figura de remoção"]').click();

        cy.contains("Remover recurso").should("be.visible");
        cy.contains(/Você deseja remover o recurso/).should("be.visible");
        cy.contains("button", "REMOVER").click();
      });

    // Locate the container that holds both the title and the "EDITAR" button
    cy.contains("h1", "Sample OER Title")
      .eq(0)
      .parent()
      .parent()
      .within(() => {
        cy.contains("EDITAR").click();
      });
  });

  it(`editpostedreas page`, () => {
    cy.login();
    cy.viewport(viewport.width, viewport.height);
    cy.visit("/postedreaedit/44");

    const updatedMetadata = {
      title: "Updated OER Title",
      contributor: "New Jane Doe",
      type: "Sites ou Materiais Online",
      source: "https://newexample.com",
      audience: "Ensino Fundamental",
      creator: "Jane Doe",
      publisher: "Sample Publisher",
      image: "image.jpg",
      language: "Português",
      format: "PDF",
      subject: "Linguagens",
      rights: "Acesso Aberto",
      coverage: "Global",
      date: "2025-02-05",
      description: "This is a sample OER description.",
      instructionalMethod: "Use this resource for educational purposes.",
    };

    cy.get("input#title").clear().type(updatedMetadata.title);
    cy.get("input#contributor").clear().type(updatedMetadata.contributor);
    cy.get("#5").click();
    cy.contains(updatedMetadata.type).click();
    cy.get("input#source").clear().type(updatedMetadata.source);
    cy.get("#1").click();
    cy.contains(updatedMetadata.audience).click();
    cy.get("input#creator").clear().type(updatedMetadata.creator);
    cy.get("input#publisher").clear().type(updatedMetadata.publisher);

    // Save the resource
    cy.get("button#submitButton").click();
  });

  it(`ReaView page`, () => {
    cy.login();
    cy.viewport(viewport.width, viewport.height);
    cy.visit("/ReaView/44");

    cy.wait(1000);

    // Like
    cy.get('img[alt="Joinha"]').click();
    cy.wait(1000);
    cy.get('button[class*="socialButton"][class*="likedButton"]').should(
      "exist"
    );

    //Comment
    cy.get("textarea#commentTextArea").type("This is a test comment!");

    cy.get('button[class*="submitButton"]').click();

    cy.get('div[class*="commentList"]')
      .should("exist")
      .should("be.visible")
      .should("have.length.gt", 0);

    cy.get('div[class*="commentList"]').should(
      "contain",
      "This is a test comment!"
    );

    // Delete comment
    cy.get('div[class*="commentList"]')
      .contains("button", "Excluir")
      .should("exist")
      .should("be.visible")
      .click();

    cy.contains("Remover comentário").should("exist").should("be.visible");
    cy.contains(/Você deseja mesmo remover o seu comentário?/)
      .should("exist")
      .should("be.visible");
    cy.get('div[class*="modalContainer"]').within(() => {
      cy.get('div[class*="buttonsContainer"]').within(() => {
        cy.contains("button", "CANCELAR").should("exist").should("be.visible");
        cy.contains("button", "REMOVER")
          .should("exist")
          .should("be.visible")
          .click();
      });
    });

    cy.contains("Informar um Problema")
      .should("exist")
      .should("be.visible")
      .click();

    cy.contains("Por favor, informe qual o problema com o recurso.")
      .should("exist")
      .should("be.visible");
    cy.get('div[class*="modalContainer"]').within(() => {
      cy.get("textarea").type("MObile issue report!");
      cy.contains("button", "CANCELAR").should("exist").should("be.visible");
      cy.contains("button", "ENVIAR")
        .should("exist")
        .should("be.visible")
        .click();
    });

    cy.contains('Sucesso!').should('exist').should('be.visible');
        cy.contains('Seu problema foi enviado.').should('exist').should('be.visible'); //necessário para esperar o modal sumir

    //Click the image for the source
    cy.get('div[class*="thumbAuxContainer"]').within(() => {
      cy.get("a").eq(0).click();
    });
  });

  it(`profile page`, () => {
    cy.login();
    cy.viewport(viewport.width, viewport.height);
    cy.visit("/profile");

    cy.wait(1000);

    cy.get('div[class*="inputWithButton"]')
      .eq(0)
      .within(() => {
        cy.get("button").click();
      });

    cy.get('input[name="given_name"]').clear().type("Maria Teste");
    cy.get('input[name="family_name"]').clear().type("Maria Teste Family");
    cy.get('input[name="institution"]').clear().type("Maria Teste Institution");
    cy.get('input[name="profile"]').clear().type("Maria Teste Profile");

    cy.get('button[type="submit"]').click();

    cy.wait(1000);

    cy.contains('Deletar conta').should('be.visible').click();

    cy.get('div[class*="modalContainer"]')
        .within(() => {
            cy.contains('Remover Conta?').should('be.visible');
            cy.contains('Essa ação vai remover todos os seus dados do site, incluindo recursos e comentários.').should('be.visible');
            cy.contains('REMOVER').should('be.visible');
            cy.contains('CANCELAR').should('be.visible').click();
        });

    cy.get('div[class*="help"]').click();
  });

  it('help page', () => {
    cy.viewport(viewport.width, viewport.height);
    cy.visit('/help');

    cy.contains('FAQ').click();
    cy.contains('Problemas Comuns').click();
  });
});
