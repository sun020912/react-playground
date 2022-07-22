import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filtColors, filtPage } from "redux/filtersSlice";
import { getTodos } from "redux/todosSlice";

const ColorFiltersItem = ({ name, defaultChecked }) => {
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    setDisabled(true);
    const changeType = e.target.checked ? "added" : "removed";
    dispatch(filtColors(e.target.name, changeType));
    dispatch(filtPage());
    try {
      await dispatch(getTodos()).unwrap();
    } catch (error) {
      // TODO: app behaviour on error
      dispatch(filtColors(e.target.name, !changeType));
      alert("Fetch error");
    } finally {
    }
    setDisabled(false);
  };

  return (
    <label>
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleChange}
      />
      <span className="color-block" style={{ backgroundColor: name }}></span>
      {name}
    </label>
  );
};

export default ColorFiltersItem;
