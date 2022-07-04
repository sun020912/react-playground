import React, { useState } from "react";
import { ReactComponent as TimesSolid } from "./times-solid.svg";
import { useDispatch } from "react-redux";
import { deleteColor, fetchColors } from "./colorsSlice";
import { filterColors } from "../filters/filtersSlice";
import { fetchTodos } from "../todos/todosSlice";

const ColorListItem = ({ id, name }) => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const lowerCaseName = name.toLowerCase();

  const onDelete = async () => {
    setDisabled(true);
    dispatch(filterColors(lowerCaseName, "removed"));
    try {
      await dispatch(deleteColor(id)).unwrap();
      await dispatch(fetchColors()).unwrap();
      await dispatch(fetchTodos()).unwrap();
    } catch (error) {
      // TODO: app behaviour after failure
      dispatch(filterColors(lowerCaseName, "added"));
      alert("Delete error");
    } finally {
      setDisabled(false);
    }
  };

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <div
            className="todo-text"
            style={{
              color: lowerCaseName,
            }}
          >
            {name}
          </div>
        </div>
        <div className="segment buttons">
          <button className="destroy" onClick={onDelete} disabled={disabled}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  );
};

export default ColorListItem;
