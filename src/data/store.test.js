import { describe, it, expect, beforeEach } from "vitest";
import { useStore } from "./store";
import { create } from "zustand";
import { act } from "@testing-library/react";

const createStore = () => {
  const store = useStore;
  store.setState({
    todos: [],
    todayName: "Måndag",
    setTodayName: (newTodayName) => store.setState({ todayName: newTodayName }),
    toggleTodo: (id) => {
      store.setState((state) => ({
        todos: state.todos.map((t) => {
          if (t.id === id) {
            return { ...t, done: !t.done };
          }
          return t;
        }),
      }));
    },
    resetTodos: () => store.setState({ todos: [] }),
    setTodos: (newTodos) => store.setState({ todos: newTodos }),
  });
  return store;
};

describe("useStore", () => {
  beforeEach(() => {
    useStore.setState({
      todos: [],
      todayName: "Måndag",
      setTodayName: (newTodayName) =>
        useStore.setState({ todayName: newTodayName }),
      toggleTodo: (id) =>
        useStore.setState((state) => ({
          todos: state.todos.map((t) =>
            t.id === id ? { ...t, done: !t.done } : t
          ),
        })),
      resetTodos: () => useStore.setState({ todos: [] }),
      setTodos: (newTodos) => useStore.setState({ todos: newTodos }),
    });
  });

  it("should have the correct initial state", () => {
    const state = useStore.getState();
    expect(state.todos).toEqual([]);
    expect(state.todayName).toBe("Måndag");
  });

  it("should set todayName correctly", () => {
    act(() => useStore.getState().setTodayName("Tisdag"));

    const state = useStore.getState();
    expect(state.todayName).toBe("Tisdag");
  });

  it("should toggle todo correctly", () => {
    const initialTodos = [{ id: 1, text: "Test todo", done: false }];
    act(() => useStore.getState().setTodos(initialTodos));

    act(() => useStore.getState().toggleTodo(1));
    let state = useStore.getState();
    expect(state.todos[0].done).toBe(true);

    act(() => useStore.getState().toggleTodo(1));
    state = useStore.getState();
    expect(state.todos[0].done).toBe(false);
  });

  it("Should reset todos correctly", () => {
    const initialTodos = [
      { id: 1, text: "Test todo 1", done: false, late: true },
      { id: 2, text: "Test todo 2", done: true, late: false },
      { id: 3, text: "Test todo 3", done: false, late: false },
    ];
    act(() => useStore.getState().setTodos(initialTodos));

    act(() => useStore.getState().resetTodos());
    let state = useStore.getState();
    expect(state.todos).toEqual([]);
  });

  it("should set todos correctly", () => {
    const newTodos = [{ id: 1, text: "New todo", done: false, late: true }];
    act(() => useStore.getState().setTodos(newTodos));
    let state = useStore.getState();
    expect(state.todos).toEqual(newTodos);
  });
});
