import React from "react";
import ReactDOM from "react-dom/client";
import "index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "store";
import {
  filtColors,
  filtPage,
  filtPageSize,
  filtSortBy,
  filtStatus,
} from "store/filtersSlice";
import { Provider } from "react-redux";
import { findAll as findAllColors } from "store/colorsSlice";
import { getTodos } from "store/todos/todos.slice";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

const start = async () => {
  root.render(<h3 style={{ textAlign: "center" }}>Initializing...</h3>);
  try {
    await store.dispatch(findAllColors()).unwrap();

    const hrefSearchParams = new URL(document.location).searchParams;
    await store.dispatch(getTodos(hrefSearchParams.toString()));

    if (store.getState().todos.status === "succeeded") {
      hrefSearchParams.has("pageSize") &&
        store.dispatch(filtPageSize(hrefSearchParams.get("pageSize")));
      hrefSearchParams.has("status") &&
        store.dispatch(filtStatus(hrefSearchParams.get("status")));
      hrefSearchParams.has("softBy") &&
        store.dispatch(filtSortBy(hrefSearchParams.get("softBy")));
      hrefSearchParams.has(
        "page" && !Number.isNaN(hrefSearchParams.get("page"))
      ) && store.dispatch(filtPage(hrefSearchParams.get("page")));
      if (hrefSearchParams.has("colors")) {
        const colors = hrefSearchParams.get("colors")?.split(",");
        if (colors?.length > 0)
          colors.forEach((color) => {
            store.dispatch(filtColors(color, "added"));
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
