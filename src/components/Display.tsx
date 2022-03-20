import { CSSTransition } from "react-transition-group";
import { useEffect, useState } from "react";
import {
  animals,
  cry,
  dancing,
  disapproval,
  flex,
  hug,
  love,
  nervous,
  pointing,
  shrug,
  smiling,
  std,
  surprised,
  tableflip,
} from "../lib/emotes";
import Group from "./Group";
import "../styles/display.scss";
import Information from "./Information";
import Tooltip from "./Tooltip";

function Display() {
  /* State */
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [favorites, setFavorites] = useState<Array<string>>([]);

  /** Show message */
  const spawnTooltip = (message: string) => {
    setMessage(message);
    setShowMessage(true);
  };

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavs = localStorage.getItem("favorites");

    if (savedFavs === null) return;

    const parsed = JSON.parse(savedFavs);

    // Validate array
    if (
      Array.isArray(parsed) &&
      parsed.every((item) => typeof item === "string")
    ) {
      // Load favorites
      setFavorites(parsed);
    }
  }, []);

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

  const toggleFavorite = (emote: string, group: string) => {
    if (group === "Favorites") {
      // Remove from favorites
      setFavorites(favorites.filter((item) => item !== emote));
    } else {
      // Check for duplicates
      const duplicate = favorites.find((kao) => kao === emote);
      if (duplicate) return;

      // Add to favorites
      setFavorites((oldFavorites) => [...oldFavorites, emote]);
    }
  };

  // Update favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const groups = [
    std,
    smiling,
    love,
    hug,
    flex,
    animals,
    surprised,
    dancing,
    shrug,
    tableflip,
    disapproval,
    cry,
    nervous,
    pointing,
  ];

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
        onRightClick={toggleFavorite}
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
      <div className="Display">
        <Group
          name="Favorites"
          content={favorites}
          onClick={(kao) => copy(kao)}
          onRightClick={toggleFavorite}
        />
        {display}
      </div>
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
