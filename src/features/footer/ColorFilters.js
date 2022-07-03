import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterColors } from "../filters/filtersSlice";
import { fetchTodos } from "../todos/todosSlice";

const ColorFilters = () => {
  const [disabled, setDisabled] = useState(false);
  const colors = useSelector((state) => state.colors.data);
  const filteredColors = useSelector((state) => state.filters.color);
  const dispatch = useDispatch();

  const renderedColors = colors.map((color) => {
    const name = color.name.toLowerCase();
    const checked = filteredColors.includes(name);

    const handleChange = async (e) => {
      setDisabled(true);
      const changeType = e.target.checked ? "added" : "removed";
      dispatch(filterColors(e.target.name, changeType));
      try {
        await dispatch(fetchTodos()).unwrap();
      } catch (error) {
        // dispatch(filterColors(e.target.name, !changeType));
      } finally {
      }
      setDisabled(false);
    };

    return (
      <label key={color.id}>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: name,
          }}
        ></span>
        {color.name}
      </label>
    );
  });

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelector">{renderedColors}</form>
    </div>
  );
};

export default ColorFilters;
