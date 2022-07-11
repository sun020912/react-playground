import React from "react";
import ActionButtons from "./ActionButtons";
import ColorFilters from "./ColorFilters";
import RemainingTodos from "./RemainingTodos";
import StatusFilter from "./StatusFilter";

const TodoListFooter = () => {
  return (
    <footer className="footer">
      <ActionButtons />
      <RemainingTodos />
      <StatusFilter />
      <ColorFilters />
    </footer>
  );
};

export default TodoListFooter;
