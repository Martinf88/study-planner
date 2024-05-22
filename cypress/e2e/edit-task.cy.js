describe("Edit tasks", () => {
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
});
