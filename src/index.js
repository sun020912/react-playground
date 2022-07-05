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
    await store.dispatch(fetchColors()).unwrap();

    // TODO: add case if wrong params, no todo found inside app

    const queryString = window.location.search;
    const queryObject = qs.parse(queryString, {
      ignoreQueryPrefix: true,
    });

    if (queryObject.pageSize)
      store.dispatch(filterPageSize(queryObject.pageSize));
    if (queryObject.status) store.dispatch(filterStatus(queryObject.status));
    if (queryObject.softBy) store.dispatch(filterSortBy(queryObject.softBy));
    if (queryObject.colors) {
      const colors = queryObject.colors.split(",");
      colors.forEach((color) => {
        store.dispatch(filterColors(color, "added"));
      });
    }

    await store.dispatch(fetchTodos(queryString)).unwrap();

    // TODO: dispatch state status
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
      <>
        <h3 style={{ textAlign: "center" }}>Error</h3>
        <button onClick={start}>Try again</button>
      </>
    );
  }
};

start();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
