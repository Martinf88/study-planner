import React from "react";
import Day from "./Day";

describe("<Day />", () => {
  it("renders", () => {
    const dayData = [
      { id: 1, text: "Task 1" },
      { id: 2, text: "Task 2" },
      { id: 3, text: "Task 3" },
    ];
    cy.mount(<Day day={dayData} name={"Test-dag"} />);

    cy.get("h2").contains("Test-dag").should("be.visible");
    cy.contains("Task 1").should("be.visible");
    cy.contains("Task 2").should("be.visible");
    cy.contains("Task 3").should("be.visible");
    cy.get("button").contains("Ny uppgift").should("be.visible");
  });

  it("renders correctly with an empty dayData", () => {
    const dayData = [];
    cy.mount(<Day day={dayData} name={"Test-dag"} />);

    cy.get("h2").contains("Test-dag").should("be.visible");
    cy.get(".item").should("not.exist");
    cy.get("button").contains("Ny uppgift").should("be.visible");
  });
});
