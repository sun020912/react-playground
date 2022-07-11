import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Todos from "./todos/Todos";
import Colors from "./colors/Colors";

const Index = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="todos" replace={true} />} />
      <Route path="todos" element={<Todos />} />
      <Route path="colors" element={<Colors />} />
    </Routes>
  );
};

export default Index;
