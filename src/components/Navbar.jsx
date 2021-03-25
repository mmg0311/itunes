import React, { useState } from "react";
import { useDispatch } from "react-redux";
import logo from "../logo.svg";
import { fetchSongs } from "../features/music/musicSlice";

function Navbar() {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    if (e.key === "Enter" && term) {
      dispatch(fetchSongs(term));
    }
  };
  return (
    <div className="nav__container">
      <div className="navbar">
        <div className="left">
          <img src={logo} alt="" />
        </div>
        <div className="right">
          <div className="search">
            <input
              type="search"
              value={term}
              placeholder="Search a song"
              onKeyDown={handleSearch}
              onChange={(e) => setTerm(e.target.value)}
            />
            <span className="fas fa-search"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
