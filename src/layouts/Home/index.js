import React from "react";
import Header from "components/Header";
import Navbar from "components/Navbar";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

const Home = () => {
  return (
    <Box className="App">
      <Header title="TodoList Application" />
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
