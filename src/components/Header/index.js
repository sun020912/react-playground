import React from "react";

const Header = ({ title }) => {
  return (
    <nav>
      <section>
        <h1 style={{ textAlign: "center" }}>{title}</h1>
      </section>
    </nav>
  );
};

export default Header;
