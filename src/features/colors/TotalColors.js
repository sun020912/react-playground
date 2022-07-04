import React from "react";
import { useSelector } from "react-redux";

const TotalColors = () => {
  let count = 0;
  const colors = useSelector((state) => state.colors.data);

  colors.forEach((color, index) => {
    count++;
  });

  return (
    <div className="todo-count">
      <h5>Total Color</h5>
      <strong>{count}</strong> color{count > 1 && "s"}
    </div>
  );
};

export default TotalColors;
