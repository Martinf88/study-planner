import React from "react";
import Day from "./Day";
// import { useStore } from "../../data/store";

describe("<Day />", () => {
  it("renders", () => {
    const dayData = [
      { id: 1, name: "Task 1" },
      { id: 2, name: "Task 2" },
      // Lägg till fler uppgifter om det behövs för att testa olika scenarier
    ];

    // Skicka med dagdata som prop till Day-komponenten
    cy.mount(<Day day={dayData} name={"kalle anka"} />);

    cy.get("h2").should("be.visible");
  });
});
