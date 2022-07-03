import React from "react";
import { useSelector } from "react-redux";
import { selectTodos } from "../todos/todosSlice";

const RemainingTodos = () => {
  let count = 0;
  const todos = useSelector((state) => selectTodos(state));

  todos.forEach((todo, index) => {
    if (todo.completed) count++;
  });

  return (
    <div className="todo-count">
      <h5>Remaining Totos</h5>
      <strong>{count}</strong> item{count > 1 && "s"} left
    </div>
  );
};

export default RemainingTodos;
