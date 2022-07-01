import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as TimesSolid } from "./times-solid.svg";
import { selectTodoById } from "./todosSlice";
import { selectColors } from "../colors/colorsSlice";

const TodoListItem = ({ id }) => {
  // TODO: check why nested in useSelector
  const todo = useSelector((state) => selectTodoById(state, id));
  const { text, completed, color } = todo;

  const dispatch = useDispatch();

  const handleCompletedChanged = () => {
    // TODO: change in both client state and request to server
  };

  const handleColorChanged = () => {
    // TODO: change in both client state and request to server
  };

  const onDelete = () => {
    // TODO: change in both client state and request to server
  };

  // BUG#1: convert object to array id and name
  const colorOptions = useSelector(selectColors).map((c) => (
    <option key={c} value={c}>
      {c}
    </option>
  ));

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            {colorOptions}
          </select>
          <button className="destroy" onClick={onDelete}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
