import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RemainingTodos from "./RemainingTodos";
import ColorFilters from "./ColorFilters";
import StatusFilter from "./StatusFilter";
import { fetchTodos, markCompleted, clearCompleted } from "../todos/todosSlice";
import axios from "axios";
import qs from "qs";
import { loremTodo } from "../../utils";
import { apiServer, onStartQuery } from "../../config";

const Footer = () => {
  const todoIds = useSelector((state) => state.todos.ids);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const avalableColors = useSelector((state) => state.colors.data);

  const handleTodosUpdate = async (thunkFn) => {
    setDisabled(true);
    try {
      await dispatch(thunkFn(todoIds)).unwrap();
      dispatch(fetchTodos());
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
      const promises = [];
      for (let i = 0; i < onStartQuery.pageSize; i++) {
        const newTodo = {
          text: loremTodo.generateWords(3),
        };
        const newTodoPost = async (newTodo) =>
          await axios.post(`${apiServer}todos`, newTodo);
        promises.push(newTodoPost(newTodo));
      }
      await Promise.all(promises);
      dispatch(fetchTodos());
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
      const promises = [];
      for (let i = 0; i < todoIds.length; i++) {
        const newTodo = {
          color:
            avalableColors[
              Math.floor(Math.random() * avalableColors.length)
            ].name.toLowerCase(),
          completed: Math.random() < 0.5,
        };
        const newTodoPost = async (newTodo) =>
          await axios({
            method: "put",
            headers: { "content-type": "application/x-www-form-urlencoded" },
            url: `${apiServer}todos/${todoIds[i]}`,
            data: qs.stringify(newTodo),
          });
        promises.push(newTodoPost(newTodo));
      }
      await Promise.all(promises);
      dispatch(fetchTodos());
    } catch (error) {
      // TODO: app behaviour after failure
      alert("Add error");
    } finally {
      setDisabled(false);
    }
  };

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button
          className="button"
          onClick={() => handleTodosUpdate(markCompleted)}
          disabled={disabled}
        >
          Mark All Completed
        </button>
        <button
          className="button"
          onClick={() => handleTodosUpdate(clearCompleted)}
          disabled={disabled}
        >
          Clear Completed
        </button>
        <button
          className="button"
          onClick={handleAddRandom}
          disabled={disabled}
        >
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
      <RemainingTodos />
      <StatusFilter />
      <ColorFilters />
    </footer>
  );
};

export default Footer;
