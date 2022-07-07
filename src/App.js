import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./app/Home";
import ColorList from "./features/colors/ColorList";
import TodoEdit from "./features/todos/TodoEdit";
import TodoList from "./features/todos/TodoList";
import TodoView from "./features/todos/TodoView";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="" element={<Navigate to="todos" replace={true} />} />
        <Route path="todos">
          <Route index element={<TodoList />} />
          <Route path="view/:id" element={<TodoView />} />
          <Route path="edit/:id" element={<TodoEdit />} />
        </Route>
        <Route path="colors">
          <Route index element={<ColorList />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
