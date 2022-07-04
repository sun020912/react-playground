import React from "react";
import { Routes, Route, NavLink, Outlet } from "react-router-dom";
import ColorList from "./features/colors/ColorList";
import Footer from "./features/footer/Footer";
import Header from "./features/header/Header";
import TodoList from "./features/todos/TodoList";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <nav>
              <section>
                <h1 style={{ textAlign: "center" }}>
                  Redux Fundamentals Example
                </h1>
              </section>
            </nav>
            <main>
              <section className="medium-container">
                <div
                  style={{
                    fontSize: "2rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <NavLink
                    to="/todos"
                    style={({ isActive }) => ({
                      margin: "0.5rem",
                      textDecoration: "none",
                      color: isActive ? "black" : "gray",
                    })}
                  >
                    Todos
                  </NavLink>
                  <NavLink
                    to="/colors"
                    style={({ isActive }) => ({
                      margin: "0.5rem",
                      textDecoration: "none",
                      color: isActive ? "black" : "gray",
                    })}
                  >
                    Colors
                  </NavLink>
                </div>
                <div className="todoapp">
                  <Header />
                  <Outlet />
                  <Footer />
                </div>
              </section>
            </main>
          </div>
        }
      >
        <Route index element={<TodoList />} />
        <Route path="todos" element={<TodoList />} />
        <Route path="colors" element={<ColorList />} />
      </Route>
    </Routes>
  );
};

export default App;
