import React from "react";
import { useSelector } from "react-redux";
import { extractPageNum } from "../../utils";
import qs from "qs";
import { Link } from "react-router-dom";

const PaginationButton = ({ url, label, active, key }) => {
  const filters = useSelector((state) => state.filters);
  let clientUrl = "";
  if (url) {
    clientUrl = `/todos?${qs.stringify(filters, {
      arrayFormat: "comma",
    })}&page=${extractPageNum(url)}`;
  }
  return (
    <button
      key={key}
      disabled={active}
      style={{
        fontSize: "1.25rem",
        fontWeight: "normal",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
      }}
    >
      {/* {label} */}
      <Link
        to={clientUrl}
        style={{
          textDecoration: "none",
        }}
      >
        {label}
      </Link>
    </button>
  );
};

export default PaginationButton;
