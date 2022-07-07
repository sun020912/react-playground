import Box from "@mui/material/Box";
import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <Box className="App">
      <Header />
      <Box container="main">
        <section className="medium-container">
          <Navbar />
          <Box className="todoapp">
            <Outlet />
          </Box>
        </section>
      </Box>
    </Box>
  );
};

export default Home;
