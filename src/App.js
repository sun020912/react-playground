import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomeLayout from "./layouts/Home";
import AccountLayout from "layouts/Account";
import Account from "routes/account/Account";
import Index from "routes/Index";

const App = () => {
  return (
    <Routes>
      <Route path="">
        <Route index element={<Navigate to="todos" replace={true} />} />
      </Route>
      <Route path="" element={<HomeLayout />}>
        <Route path="*" element={<Index />} />
      </Route>
      <Route path="account" element={<AccountLayout />}>
        <Route path="*" element={<Account />} />
      </Route>
    </Routes>
  );
};

export default App;
