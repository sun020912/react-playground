import { configureStore } from "@reduxjs/toolkit";

import { todosReducer } from "./todos/todos.slice";

export * from "store/todos/todos.slice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});
