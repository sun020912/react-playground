import React from "react";
import { Link } from "react-router-dom";

const PaginationButton = ({ url, label, active, key }) => {
  return (
    <Link to={url}>
      <button
        key={key}
        disabled={active}
        className={active ? "selected" : undefined}
        style={{
          textDecoration: "none",
          fontSize: "1.25rem",
          fontWeight: active ? "bold" : "lighter",
          marginLeft: "0.5rem",
          marginRight: "0.5rem",
          color: active ? "black" : "gray",
        }}
      >
        {label}
      </button>
    </Link>
  );
};

export default PaginationButton;
