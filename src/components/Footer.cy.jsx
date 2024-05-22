import React from "react";
import Footer from "./Footer";
import { useStore } from "../data/store";

describe("<Footer />", () => {
  it("renders", () => {
    cy.mount(<Footer />);
  });

  it("renders dayName correctly", () => {
    useStore.getState().todayName;
    cy.mount(<Footer />);
    cy.get(".today").contains("Idag är det: Måndag").should("be.visible");
  });
});
