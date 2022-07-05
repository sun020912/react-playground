import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterColors } from "../filters/filtersSlice";
import { fetchTodos } from "../todos/todosSlice";
import { useSearchParams } from "react-router-dom";
import qs from "qs";

const ColorFilters = () => {
  const [disabled, setDisabled] = useState(false);
  const colors = useSelector((state) => state.colors.data);
  const currentFilters = useSelector((state) => state.filters);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(
      `${qs.stringify(currentFilters, {
        arrayFormat: "comma",
      })}&page=1`
    );
  }, [currentFilters.colors]);

  const renderedColors = colors.map((color) => {
    const name = color.name.toLowerCase();
    const checked = currentFilters.colors.includes(name);

    const handleChange = async (e) => {
      setDisabled(true);
      const changeType = e.target.checked ? "added" : "removed";
      dispatch(filterColors(e.target.name, changeType));
      try {
        await dispatch(fetchTodos()).unwrap();
      } catch (error) {
        // TODO: app behaviour on error
        dispatch(filterColors(e.target.name, !changeType));
        alert("Fetch error");
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
