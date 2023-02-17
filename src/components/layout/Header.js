import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className=" header text-white flex items-center justify-center gap-x-4 py-10 mb-10">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "text-[#00aefd] text-3xl" : "")}
      >
        Home
      </NavLink>
      <NavLink
        to="/movie"
        className={({ isActive }) => (isActive ? "text-[#00aefd] text-3xl" : "")}
      >
        Movie
      </NavLink>
    </header>
  );
};

export default Header;
