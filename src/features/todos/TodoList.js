import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";
import todosSlice, { fetchTodos } from "./todosSlice";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  let links = [];
  if (todos.meta) {
    if (todos.meta.links.length > 7) {
      const middle = [
        {
          label: "...",
          active: true,
        },
      ];
      links = todos.meta.links
        .slice(1, 3)
        .concat(middle)
        .concat(todos.meta.links.slice(-3, -1));
    } else {
      links = todos.meta.links.slice(1, -1);
    }
  }

  const Pagination = links.map(({ url, label, active }, index) => {
    const handleClick = () => {
      dispatch(fetchTodos(url));
    };
    return (
      <button
        key={index}
        onClick={handleClick}
        disabled={active}
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          marginLeft: "0.5rem",
          marginRight: "0.5rem",
        }}
      >
        {label}
      </button>
    );
  });

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
              marginBottom: "1rem",
            }}
          >
            {Pagination}
          </div>
        </>
      );
  }
};

export default TodoList;
