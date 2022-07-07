import React from "react";
import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";

const Navbar = () => {
  return (
    <Box
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
    </Box>
  );
};

export default Navbar;
