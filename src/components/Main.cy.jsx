import React from "react";
import Main from "./Main";

// 1. Som en student vill jag att veckans alla dagar ska visas, så att jag kan välja fritt när jag vill göra mina uppgifter.

describe("<Main />", () => {
  beforeEach(() => {
    cy.mount(<Main />);
  });
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.get("main").should("exist").and("be.visible");
  });

  it("displays seven Day components", () => {
    cy.get(".day-view").should("exist").and("be.visible");

    cy.get(".day-view").children().should("have.length", 7);
  });

  it("displays correct day names", () => {
    const dayNames = [
      "Måndag",
      "Tisdag",
      "Onsdag",
      "Torsdag",
      "Fredag",
      "Lördag",
      "Söndag",
    ];

    dayNames.forEach((dayName, index) => {
      cy.get(".day-view").children().eq(index).contains(dayName);
    });
  });
});
