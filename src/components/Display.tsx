import { CSSTransition } from "react-transition-group";
import { useEffect, useState } from "react";
import { group1, group2, group3, group4 } from "../lib/emotes";
import Group from "./Group";
import "../styles/display.scss";
import Information from "./Information";
import Tooltip from "./Tooltip";

function Display() {
  /* State */
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  /** Show message */
  const spawnTooltip = (message: string) => {
    setMessage(message);
    setShowMessage(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });

  /**
   * Copy emoji to clipboard
   */
  const copy = (emote: string) => {
    navigator.clipboard.writeText(emote);
    spawnTooltip("Copied!");
  };

  const groups = [group1, group2, group3, group4];

  const names: string[] = [];

  const display = groups.map((group) => {
    if (group.length === 0) return false;

    // First element of the array is the group name
    const groupName = group[0];

    names.push(groupName);

    return (
      <Group
        name={groupName}
        key={groupName}
        content={group.slice(1)}
        onClick={(kao) => copy(kao)}
      />
    );
  });

  const navigation = names.map((name) => {
    return (
      <a className="Link" key={name} href={"#" + name}>
        {name}
      </a>
    );
  });

  return (
    <>
      <Information />
      <div className="Display">{display}</div>
      <nav className="Navigation">{navigation}</nav>
      <CSSTransition
        in={showMessage}
        timeout={200}
        unmountOnExit
        classNames="message"
      >
        <Tooltip message={message} />
      </CSSTransition>
    </>
  );
}

export default Display;
