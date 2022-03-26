import * as React from "react";
import "../styles/header.scss";
import settings from "../assets/settings.svg";

type Props = {
  onClick: () => void;
};

function Header(props: Props) {
  return (
    <div className="Header">
      <span className="Header__text">Kaomoji Picker</span>
      <span style={{ flex: 1 }}></span>
      <button
        className="Header__icon"
        title="Preferences"
        onClick={props.onClick}
      >
        <img src={settings} alt="Preferences" />
      </button>
    </div>
  );
}

export default Header;
