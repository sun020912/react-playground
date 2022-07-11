import React from "react";
import extractParamFromUrl from "utils/extractParamFromUrl";
import PaginationItem from "./PaginationItem";

const Pagination = ({ links }) => {
  const renderedList = links
    .slice(1, -1)
    .map(({ url, label, active }, index) => {
      const navlink = new URL(document.location);
      const page = extractParamFromUrl(url || navlink, "page");
      navlink.searchParams.set("page", page);
      return (
        <PaginationItem
          key={index}
          label={label}
          to={navlink}
          active={active}
        />
      );
    });
  return renderedList;
};

export default Pagination;
