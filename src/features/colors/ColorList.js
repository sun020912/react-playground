import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorListItem from "./ColorListItem";

const ColorList = () => {
  const colors = useSelector((state) => state.colors);

  switch (colors.status) {
    case "loading":
      return (
        <div className="todo-list">
          <div className="loader" />
        </div>
      );
    case "failed":
      return <h2>Please add some colors!</h2>;
    default:
      return (
        <>
          <ul className="todo-list">
            {colors.data.map(({ id, name }) => {
              return <ColorListItem key={id} id={id} name={name} />;
            })}
          </ul>
        </>
      );
  }
};

export default ColorList;
