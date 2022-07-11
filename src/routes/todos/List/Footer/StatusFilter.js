import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "store/todosSlice";
import { filtPage, filtStatus, selectFiltersStatus } from "store/filtersSlice";
import statuses from "constants/statuses";

const StatusFilter = () => {
  const [disabled, setDisabled] = useState(false);
  const currentStatus = useSelector((state) => selectFiltersStatus(state));
  const dispatch = useDispatch();

  const onSelectStatus = async (value) => {
    setDisabled(true);
    dispatch(filtStatus(value));
    dispatch(filtPage());
    try {
      dispatch(filtStatus(value));
      dispatch(filtPage());
      await dispatch(getTodos());
    } catch {
      // TODO: app behaviour on failure
    } finally {
      setDisabled(false);
    }
  };

  const renderedFilters = Object.keys(statuses).map((key) => {
    const value = statuses[key];
    const handleClick = () => onSelectStatus(value);
    const className = value === currentStatus ? "selected" : "";

    return (
      <li key={value}>
        <button className={className} onClick={handleClick} disabled={disabled}>
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
