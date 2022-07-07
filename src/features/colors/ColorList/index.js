import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ColorListFooter from "./ColorListFooter";
import ColorListItem from "./ColorListItem";
import Loader from "../../../components/Loader";
import HeaderInput from "../../../components/HeaderInput";
import { fetchColors, saveNewColor } from "../colorsSlice";
import { basicColors } from "../config";

const ColorList = () => {
  const colors = useSelector((state) => state.colors);
  const dispatch = useDispatch();

  const addNewColor = async (inputText) => {
    try {
      if (inputText.trim()) {
        await dispatch(saveNewColor(inputText)).unwrap();
      } else {
        await dispatch(
          saveNewColor(
            basicColors[Math.floor(Math.random() * basicColors.length)]
          )
        ).unwrap();
      }
      dispatch(fetchColors());
    } catch (error) {
      // TODO: App UI behaviour on color error
      alert("Add color error");
    }
  };

  let renderedList;
  switch (colors.status) {
    case "loading":
      renderedList = <Loader />;
      break;
    case "failed":
      renderedList = <h2>Please add some colors!</h2>;
      break;
    default:
      renderedList = (
        <ul className="todo-list">
          {colors.data.map(({ id, name }) => {
            return <ColorListItem key={id} id={id} name={name} />;
          })}
        </ul>
      );
  }

  return (
    <>
      <HeaderInput placeholder="Which color to add?" handleAdd={addNewColor} />
      {renderedList}
      <ColorListFooter colors={colors} />
    </>
  );
};

export default ColorList;
