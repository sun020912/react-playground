import React from "react";
import { useSelector } from "react-redux";
import { selectCompletedTodoNumber } from "store/todosSlice";

const RemainingTodos = () => {
  const count = useSelector((state) => selectCompletedTodoNumber(state));

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{count > 1 && "s"} left
    </div>
  );
};

export default RemainingTodos;
