import { describe, it, expect } from "vitest";
import { useStore } from "./store";

describe("toggleTodo, Zustand", () => {
  it("should toggle todo done status", () => {
    useStore.setState({
      todos: [
        { id: 1, text: "Test item 1", done: false, late: false },
        { id: 2, text: "Test item 2", done: true, late: false },
      ],
    });

    expect(useStore.getState().todos[0].done).to.be.false;
    expect(useStore.getState().todos[1].done).to.be.true;

    useStore.getState().toggleTodo(1);
    expect(useStore.getState().todos[0].done).to.be.true;

    useStore.getState().toggleTodo(2);
    expect(useStore.getState().todos[1].done).to.be.false;

    useStore.getState().toggleTodo(1);
    expect(useStore.getState().todos[0].done).to.be.false;

    useStore.getState().toggleTodo(2);
    expect(useStore.getState().todos[1].done).to.be.true;
  });
});
