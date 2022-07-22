import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorListFooter from "./Footer";
import ColorListItem from "./Item";
import Loader from "components/Loader";
import TopInput from "components/TopInput";
import {
  addColor as addColorThunk,
  getColors,
  selectAllColors,
  selectColorsStatus,
} from "redux/colorsSlice";

const ColorList = () => {
  const colors = useSelector((state) => selectAllColors(state));
  const loading = useSelector((state) => selectColorsStatus(state));
  const dispatch = useDispatch();

  const addColor = async (inputText) => {
    try {
      const name = inputText;
      await dispatch(addColorThunk({ name })).unwrap();
      dispatch(getColors());
    } catch (error) {
      // TODO: App UI behaviour on color error
      alert("Add color error");
    }
  };

  let renderedList;
  switch (loading) {
    case "loading":
      renderedList = <Loader />;
      break;
    case "failed":
      renderedList = <h2>Please add some colors!</h2>;
      break;
    case "succeeded":
      renderedList = (
        <ul className="todo-list">
          {Object.values(colors).map(({ id, name }) => {
            return <ColorListItem key={id} id={id} name={name} />;
          })}
        </ul>
      );
  }

  return (
    <>
      <TopInput placeholder="Which color to add?" handleAdd={addColor} />
      {renderedList}
      <ColorListFooter colors={colors} />
    </>
  );
};

export default ColorList;
