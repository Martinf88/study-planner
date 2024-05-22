describe("Edit, remove and search tasks", () => {
  it("can edit task and save it and then remove it", () => {
    //surfa till webbsidan och kör testerna på den
    cy.visit("/");

    cy.get("[title='Ändra']").each(($span) => {
      cy.wrap($span).click();
    });

    const newText = "Updated item text";
    cy.get('input[type="text"]').each(($input) => {
      cy.wrap($input).clear().type(newText);
    });

    cy.get("[title='Spara']").each(($span) => {
      cy.wrap($span).click();
    });
    cy.get("[title='Ta bort']").each(($span) => {
      cy.wrap($span).click();
    });
  });

  it("should toggle todo item status when checkbox is clicked", () => {
    cy.visit("/");
    cy.get('.item input[type="checkbox"]').each(($checkbox) => {
      cy.wrap($checkbox).click();
    });
    cy.get('.item input[type="checkbox"]').should("be.checked");
  });

  it("should be possible to search for a task", () => {
    cy.visit("/");
    cy.get("input[type='search']").should("be.visible").type("inlämning");
    cy.get(".prio-items").children().its("length").should("eq", 2);
  });
});
