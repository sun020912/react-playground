import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTodo as updateTodoThunk,
  deleteTodo,
  selectTodoById,
  getTodos,
} from "redux/todosSlice";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectAllColors } from "redux/colorsSlice";

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id));
  const { text, completed, color } = todo;
  const colors = useSelector((state) => selectAllColors(state));
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateTodo = async (payload) => {
    setDisabled(true);
    try {
      await dispatch(updateTodoThunk({ id, payload })).unwrap();
      dispatch(getTodos());
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
      dispatch(getTodos());
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
              <option key={id} value={name.toLowerCase()}>
                {name}
              </option>
            ))}
          </select>
          <IconButton
            size="large"
            aria-label={`view todo id ${id}`}
            disabled={disabled}
            color="primary"
            onClick={() => navigate(`view/${id}`)}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            size="large"
            aria-label={`delete todo id ${id}`}
            disabled={disabled}
            color="warning"
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
