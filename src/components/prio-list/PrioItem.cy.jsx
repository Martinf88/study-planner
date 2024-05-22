import React from "react";
import PrioItem from "./PrioItem";

describe("<PrioItem />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    const item = { text: "Test item", late: false };
    const num = 1;
    cy.mount(<PrioItem item={item} num={num} />);
  });

  it("should display the correct text and number", () => {
    const item = { text: "Test item", late: false };
    const num = 1;
    cy.mount(<PrioItem item={item} num={num} />);
    cy.contains("1. Test item").should("exist");
  });

  it("should have class 'due' when item is late", () => {
    const item = { text: "Test item", late: true };
    const num = 1;
    cy.mount(<PrioItem item={item} num={num} />);
    cy.get(".item.due").should("exist");
  });

  it('should not have class "due" when item is not late', () => {
    const item = { text: "Test item", late: false };
    const num = 1;
    cy.mount(<PrioItem item={item} num={num} />);
    cy.get(".item.due").should("not.exist");
  });

  it("should handle empty string", () => {
    const item = { text: "", late: false };
    const num = 1;
    cy.mount(<PrioItem item={item} num={num} />);
    cy.get(".item").contains("1").should("exist");
  });

  it("should display numbers as well", () => {
    const item = { text: 123, late: false };
    const num = 1;
    cy.mount(<PrioItem item={item} num={num} />);
    cy.get(".item").contains("1. 123").should("exist");
  });
  it("should handle NaN", () => {
    const item = { text: "Test item", late: false };
    const num = NaN;
    cy.mount(<PrioItem item={item} num={num} />);
    cy.get(".item").contains("Test item").should("exist");
  });
});
