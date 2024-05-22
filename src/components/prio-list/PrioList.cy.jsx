import React from "react";
import PrioList from "./PrioList";
import { useStore } from "../../data/store";

// Skapa mockdata från useStore med done satt till true eller false
// kontrollera att antlet som renderas bara har false på done

// 4. Som en student vill jag kunna söka efter todo items som innehåller en viss text, så att jag lätt kan se om en viss sak finns med i priolistan.

describe("<PrioList />", () => {
  beforeEach(() => {
    cy.mount(<PrioList />);
    useStore.setState({
      todos: [
        { id: 1, text: "Test item 1", done: false, late: false },
        { id: 2, text: "Test item 2", done: true, late: false },
        { id: 3, text: "Test item 3", done: false, late: false },
        { id: 4, text: "Test item 4", done: true, late: false },
        { id: 5, text: "Test item 5", done: false, late: false },
        { id: 6, text: "Test item 6", done: true, late: false },
      ],
    });
  });

  it("renders only the tasks that are not marked as done", () => {
    cy.get(".prio-list").should("exist").and("be.visible");
    cy.get(".prio-items").children().should("have.length", 3);

    cy.contains(".prio-items", "Test item 1").should("exist");
    cy.contains(".prio-items", "Test item 3").should("exist");
    cy.contains(".prio-items", "Test item 5").should("exist");

    cy.contains(".prio-items", "Test item 2").should("not.exist");
    cy.contains(".prio-items", "Test item 4").should("not.exist");
    cy.contains(".prio-items", "Test item 6").should("not.exist");
  });

  it("renders tasks in the correct order", () => {
    cy.get(".prio-items")
      .children()
      .eq(0)
      .should("contain.text", "Test item 1");
    cy.get(".prio-items")
      .children()
      .eq(1)
      .should("contain.text", "Test item 3");
    cy.get(".prio-items")
      .children()
      .eq(2)
      .should("contain.text", "Test item 5");
  });

  it("should be possible to search for a task", () => {
    cy.get("input[type='search']").should("be.visible").type("Test item 1");
    cy.get(".prio-items").should("contain.text", "Test item 1");

    cy.get(".prio-items").should("not.contain.text", "Test item 3");
    cy.get(".prio-items").should("not.contain.text", "Test item 5");
  });

  it("should be possible to search with all upper case letters", () => {
    cy.get("input[type='search']").should("be.visible").type("TEST ITEM 1");

    cy.get(".prio-items").should("contain.text", "Test item 1");

    cy.get(".prio-items").should("not.contain.text", "Test item 3");
    cy.get(".prio-items").should("not.contain.text", "Test item 5");
  });

  it("should be possible to search with all lower case letters", () => {
    cy.get("input[type='search']").should("be.visible").type("test item 3");

    cy.get(".prio-items").should("contain.text", "Test item 3");

    cy.get(".prio-items").should("not.contain.text", "Test item 1");
    cy.get(".prio-items").should("not.contain.text", "Test item 5");
  });

  it("should be possible to search with just part of the text", () => {
    cy.get("input[type='search']").should("be.visible").type("5");

    cy.get(".prio-items").should("contain.text", "Test item 5");

    cy.get(".prio-items").should("not.contain.text", "Test item 1");
    cy.get(".prio-items").should("not.contain.text", "Test item 3");

    cy.get("input[type='search']").should("be.visible").clear().type("item");
    cy.get(".prio-items").should("contain.text", "Test item 1");
    cy.get(".prio-items").should("contain.text", "Test item 3");
    cy.get(".prio-items").should("contain.text", "Test item 5");
  });
});
