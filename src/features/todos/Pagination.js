import React from "react";
import PaginationButton from "./PaginationButton";

const Pagination = ({ links }) =>
  links.map(({ url, label, active, index }) => (
    <PaginationButton url={url} label={label} active={active} key={index} />
  ));

export default Pagination;
