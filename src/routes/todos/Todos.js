import React from "react";
import { Route, Routes } from "react-router-dom";
import View from "./View";
import Edit from "./Edit";
import List from "./List";

const Todos = () => {
  return (
    <Routes>
      <Route index element={<List />} />
      <Route path="view/:id" element={<View />} />
      <Route path="edit/:id" element={<Edit />} />
    </Routes>
  );
};

export default Todos;
