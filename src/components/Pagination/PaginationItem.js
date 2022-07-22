import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { getTodos } from "redux/todosSlice";

const PaginationItem = ({ to, label, active }) => {
  const dispatch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();

  const handleClick = async (e) => {
    e.preventDefault();
    const sp = new URL(to).searchParams.toString();
    try {
      await dispatch(getTodos(sp));
      setSearchParam(sp);
    } catch {
      // TODO: app behaviour on failure
      alert(`getTodos from pagination page ${label} failure`);
    }
  };

  return (
    <NavLink
      to={to}
      style={{
        textDecoration: "none",
        fontSize: "1.25rem",
        fontWeight: active ? "bold" : "lighter",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        color: active ? "black" : "gray",
        pointerEvents: active ? "none" : "",
      }}
      onClick={(e) => handleClick(e)}
    >
      {label}
    </NavLink>
  );
};

export default PaginationItem;
