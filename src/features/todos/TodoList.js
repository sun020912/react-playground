import Pagination from "./Pagination";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";
import { useLocation } from "react-router-dom";
import { fetchTodos } from "./todosSlice";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos(location.search));
  }, [location]);

  let links;
  if (todos.meta?.links.length > 1) links = todos.meta.links.slice(1, -1);

  switch (todos.status) {
    case "loading":
      return (
        <div className="todo-list">
          <div className="loader" />
        </div>
      );
    case "failed":
      return <h2>No Todo. Yay!</h2>;
    default:
      return (
        <>
          <ul className="todo-list">
            {todos.ids.map((todoId) => {
              return <TodoListItem key={todoId} id={todoId} />;
            })}
          </ul>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0.75rem",
            }}
          >
            {links && <Pagination links={links} />}
          </div>
        </>
      );
  }
};

export default TodoList;
