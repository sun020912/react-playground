import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Edit from "./Edit";
import Login from "./Login";

const Todos = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard" replace={true} />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="edit" element={<Edit />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default Todos;
