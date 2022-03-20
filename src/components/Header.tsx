import * as React from "react";
import "../styles/header.scss";
import code from "../assets/code.svg";

function Header() {
  return (
    <div className="Header">
      <span className="Header__text">Kaomoji Panel</span>
      <span style={{ flex: 1 }}></span>
      <a
        href="https://github.com/mayudev/kaomoji-panel"
        target="_blank"
        rel="noreferrer"
        className="Header__icon"
        title="Source code"
      >
        <img src={code} alt="Source code" />
      </a>
    </div>
  );
}

export default Header;
