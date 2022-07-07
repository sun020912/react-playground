import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todosSlice";
import colorsReducer from "../features/colors/colorsSlice";
import filtersReducer from "../features/filters/filtersSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    colors: colorsReducer,
    filters: filtersReducer,
  },
});

export default store;
