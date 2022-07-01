import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todos/todosSlice";
import colorsReducer from "./features/colors/colorsSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    colors: colorsReducer,
  },
});

export default store;
