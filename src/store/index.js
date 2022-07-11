import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "store/todosSlice";
import colorsReducer from "store/colorsSlice";
import filtersReducer from "store/filtersSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    colors: colorsReducer,
    filters: filtersReducer,
  },
});

export default store;
