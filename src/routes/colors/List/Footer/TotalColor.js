import React from "react";
import { useSelector } from "react-redux";
import { selectColorIdsLength } from "redux/colorsSlice";

const TotalColor = () => {
  const colorsNum = useSelector((state) => selectColorIdsLength(state));

  return (
    <div className="todo-count">
      <h5>Total Color</h5>
      <strong>{colorsNum}</strong> color{colorsNum > 1 && "s"}
    </div>
  );
};

export default TotalColor;
