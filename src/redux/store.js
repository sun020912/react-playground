import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "redux/todosSlice";
import colorsReducer from "redux/colorsSlice";
import filtersReducer from "redux/filtersSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    colors: colorsReducer,
    filters: filtersReducer,
  },
});

export default store;
