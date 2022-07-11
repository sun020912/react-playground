import React from "react";
import { Route, Routes } from "react-router-dom";
import List from "./List";

const Colors = () => {
  return (
    <Routes>
      <Route index element={<List />} />
    </Routes>
  );
};

export default Colors;
