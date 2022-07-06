import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { fetchColors } from "./features/colors/colorsSlice";
import { fetchTodos } from "./features/todos/todosSlice";
import { BrowserRouter } from "react-router-dom";
import qs from "qs";
import {
  filterPageSize,
  filterStatus,
  filterSortBy,
  filterColors,
} from "./features/filters/filtersSlice";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

const start = async () => {
  root.render(<h3 style={{ textAlign: "center" }}>Initializing...</h3>);
  try {
    const hrefSearchParams = new URL(document.location).searchParams;

    await store.dispatch(fetchColors()).unwrap();
    await store.dispatch(fetchTodos(hrefSearchParams.toString()));

    if (store.getState().todos.status === "succeeded") {
      hrefSearchParams.has("pageSize") &&
        store.dispatch(filterPageSize(hrefSearchParams.get("pageSize")));
      hrefSearchParams.has("status") &&
        store.dispatch(filterStatus(hrefSearchParams.get("status")));
      hrefSearchParams.has("softBy") &&
        store.dispatch(filterSortBy(hrefSearchParams.get("softBy")));
      if (hrefSearchParams.has("colors")) {
        const colors = hrefSearchParams.get("colors")?.split(",");
        if (colors?.length > 0)
          colors.forEach((color) => {
            store.dispatch(filterColors(color, "added"));
          });
      }
    }

    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </React.StrictMode>
    );
  } catch (error) {
    console.log(error);
    root.render(
      <div style={{ alignItems: "center" }}>
        <h3>Error</h3>
        <button onClick={start}>Try again</button>
      </div>
    );
  }
};

start();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
