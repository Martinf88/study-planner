import React from "react";
import Item from "./Item";
import { useStore } from "../../data/store";

// 2. Som en student vill jag kunna ta bort en todo item, eftersom saker kan ändras.
// 3. Som en student vill jag kunna ändra texten för en todo item, så att jag kan uppdatera den om något nytt händer.

describe("<Item />", () => {
  beforeEach(() => {
    cy.mount(<Item item={{ done: false, late: false, text: "Test item" }} />);
  });

  it("should be possible to check and uncheck the checkbox", () => {
    cy.get('[type="checkbox"]').check().should("be.checked");
    cy.get('[type="checkbox"]').uncheck().should("not.be.checked");
  });

  describe("edit item", () => {
    it("should show span with title 'Ändra' and span with title 'Ta bort'", () => {
      cy.get("[title='Ändra']").should("be.visible");
      cy.get("[title='Ta bort']").should("be.visible");
    });

    it("should be possible to change text when span with title 'Ändra' is clicked", () => {
      const newText = "Updated item text";
      cy.get("span[title='Ändra']").click();
      cy.get('input[type="text"]').clear().type(newText);
    });

    it("should show a 'Spara' span when in edit mode and hide 'Ändra / Ta bort'", () => {
      cy.get("span[title='Ändra']").click();
      cy.get("span[title='Spara']").should("exist");
      cy.get("span[title='Ändra']").should("not.exist");
      cy.get("span[title='Ta bort']").should("not.exist");
    });

    it("should save when 'Spara' is click", () => {
      cy.get("span[title='Ändra']").click();
      cy.get("span[title='Spara']").click();
    });
  });

  describe("remove item", () => {
    it("shows a span with the text 'Ta bort' ", () => {
      cy.get("span[title='Ta bort']").should("be.visible");
    });

    it("removes task when span with the text 'Ta bort' is clicked", () => {
      useStore.setState({
        todos: [
          { id: 1, text: "Test item 1", done: false, late: false },
          { id: 2, text: "Test item 2", done: true, late: false },
          { id: 3, text: "Test item 3", done: true, late: false },
        ],
      });

      let initialTodos = useStore.getState().todos;
      expect(initialTodos).to.have.lengthOf(3);

      cy.mount(
        <Item item={{ id: 1, text: "Test item 1", done: false, late: false }} />
      );

      cy.get("span[title='Ta bort']")
        .click()
        .then(() => {
          cy.wrap(useStore)
            .invoke("getState")
            .its("todos")
            .should("have.length", 2);
        });
    });
  });
});
