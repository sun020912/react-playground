import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTodo as updateTodoThunk,
  deleteTodo,
  selectTodoById,
  fetchTodos,
} from "./todosSlice";
import { useNavigate } from "react-router-dom";
import { ReactComponent as TimesSolid } from "./times-solid.svg";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id));
  const { text, completed, color } = todo;
  const colors = useSelector((state) => state.colors.data);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateTodo = async (payload) => {
    setDisabled(true);
    try {
      await dispatch(updateTodoThunk({ id, payload })).unwrap();
      dispatch(fetchTodos());
      // TODO: optimistic update
    } catch (error) {
      // TODO: app behaviour after failure
      alert("Update error");
    } finally {
      setDisabled(false);
    }
  };

  const onDelete = async () => {
    setDisabled(true);
    try {
      await dispatch(deleteTodo(id)).unwrap();
      dispatch(fetchTodos());
    } catch (error) {
      // TODO: app behaviour after failure
      alert("Update error");
    } finally {
      setDisabled(false);
    }
  };

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={(e) =>
              updateTodo({
                completed: e.target.checked,
              })
            }
            disabled={disabled}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            defaultValue={color?.name.toLowerCase()}
            style={{ color: color?.name.toLowerCase() }}
            onChange={(e) =>
              updateTodo({
                color: e.target.value,
              })
            }
            disabled={disabled}
          >
            <option></option>
            {colors.map(({ id, name }) => (
              <option key={name.toLowerCase()} value={name.toLowerCase()}>
                {name}
              </option>
            ))}
          </select>
          <Button
            disabled={disabled}
            startIcon={<VisibilityIcon />}
            variant="outlined"
            sx={{ marginRight: "0.75rem" }}
            onClick={() => navigate(`view/${id}`)}
          >
            View
          </Button>
          <button className="destroy" onClick={onDelete} disabled={disabled}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
