import React from "react";
import { useSelector } from "react-redux";
import { selectAllColors } from "redux/colorsSlice";
import { selectFiltersColors } from "redux/filtersSlice";
import ColorFiltersItem from "./Item";

const ColorFilters = () => {
  const colors = useSelector((state) => selectAllColors(state));
  const currentColors = useSelector((state) => selectFiltersColors(state));

  const renderedColors = colors.map((color) => {
    return (
      <ColorFiltersItem
        key={color.id}
        name={color.name}
        defaultChecked={currentColors.includes(color.name.toLowerCase())}
      />
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
