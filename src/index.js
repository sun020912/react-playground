import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { fetchColors } from "./features/colors/colorsSlice";
import { fetchTodos } from "./features/todos/todosSlice";
import { BrowserRouter } from "react-router-dom";
// import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

const start = async () => {
  root.render(<h3 style={{ textAlign: "center" }}>Initializing...</h3>);
  try {
    await store.dispatch(fetchColors()).unwrap();
    await store.dispatch(fetchTodos()).unwrap();
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
