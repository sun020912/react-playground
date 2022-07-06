import React from "react";
import { useSelector } from "react-redux";
import qs from "qs";
import { Link } from "react-router-dom";

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
    <button
      key={key}
      disabled={active}
      className={active ? "selected" : undefined}
    >
      <Link
        to={clientUrl}
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
      </Link>
    </button>
  );
};

export default PaginationButton;
