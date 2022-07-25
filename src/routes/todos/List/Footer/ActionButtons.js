import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getTodos,
  markAllToCompleted,
  deleteCompleted,
  addRandomTodos as addRandomTodosThunk,
  updateRandomTodos as updateRandomTodosThunk,
} from "store/todos/todos.slice";

const ActionButtons = () => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const handleTodosUpdate = async (thunkFn) => {
    setDisabled(true);
    try {
      await dispatch(thunkFn()).unwrap();
      dispatch(getTodos());
    } catch (error) {
      // TODO: app behaviour after failure
      alert("Update error");
    } finally {
      setDisabled(false);
    }
  };

  const handleAddRandom = async () => {
    setDisabled(true);
    try {
      await dispatch(addRandomTodosThunk()).unwrap();
      dispatch(getTodos()).unwrap();
    } catch (error) {
      // TODO: app behaviour after failure
      alert("Add error");
    } finally {
      setDisabled(false);
    }
  };

  const handleUpdateRandom = async () => {
    setDisabled(true);
    try {
      await dispatch(updateRandomTodosThunk()).unwrap();
      dispatch(getTodos()).unwrap();
    } catch (error) {
      // TODO: app behaviour after failure
      alert("Update error");
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className="actions">
      <h5>Actions</h5>
      <button
        className="button"
        onClick={() => handleTodosUpdate(markAllToCompleted)}
        disabled={disabled}
      >
        Mark All Completed
      </button>
      <button
        className="button"
        onClick={() => handleTodosUpdate(deleteCompleted)}
        disabled={disabled}
      >
        Clear Completed
      </button>
      <button className="button" onClick={handleAddRandom} disabled={disabled}>
        Add random
      </button>
      <button
        className="button"
        onClick={handleUpdateRandom}
        disabled={disabled}
      >
        Update random
      </button>
    </div>
  );
};

export default ActionButtons;
