describe("smoke test", () => {
  it("passes", () => {
    //surfa till webbsidan och kör testerna på den
    cy.visit("/");
  });
});
