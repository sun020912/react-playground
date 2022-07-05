import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../todos/todosSlice";
import { filterStatus, StatusFilters } from "../filters/filtersSlice";
import { useSearchParams } from "react-router-dom";
import qs from "qs";

const StatusFilter = () => {
  const currentFilters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(
      `${qs.stringify(currentFilters, {
        arrayFormat: "comma",
      })}&page=1`
    );
  }, [currentFilters.status]);

  const onSelectStatus = async (value) => {
    dispatch(filterStatus(value));
    dispatch(fetchTodos());
  };

  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key];
    const handleClick = () => onSelectStatus(value);
    const className = value === currentFilters.status ? "selected" : "";

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    );
  });

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  );
};

export default StatusFilter;
