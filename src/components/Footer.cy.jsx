import React from "react";
import Footer from "./Footer";
import { useStore } from "../data/store";

describe("<Footer />", () => {
  it("renders", () => {
    cy.mount(<Footer />);
  });
});
