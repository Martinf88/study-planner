import { create } from "zustand";
import { todos } from "./data.js";
import { getToday } from "../utils/date.js";

const useStore = create((set) => ({
  todos: todos,

  todayName: getToday(),

  setTodayName: (newTodayName) => set({ todayName: newTodayName }),

  toggleTodo: (id) =>
    set((state) => {
      return {
        ...state,
        todos: state.todos.map((t) => {
          if (t.id === id) {
            return { ...t, done: !t.done };
          } else {
            return t;
          }
        }),
      };
    }),

  resetTodos: () => set((state) => ({ todos: [] })),

  setTodos: (newTodos) => set({ todos: newTodos }),
}));

export { useStore };
