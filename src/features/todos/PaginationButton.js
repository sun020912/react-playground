import React from "react";
import { useSelector } from "react-redux";
import qs from "qs";
import { NavLink, Link } from "react-router-dom";

const PaginationButton = ({ url, label, active, key }) => {
  const filters = useSelector((state) => state.filters);
  let clientUrl = "";
  if (url) {
    const hrefSearchParams = new URL(url).searchParams;
    clientUrl = `/todos?${qs.stringify(filters, {
      arrayFormat: "comma",
    })}&page=${hrefSearchParams.get("page")}`;
  }
  return (
    <Link to={clientUrl}>
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
