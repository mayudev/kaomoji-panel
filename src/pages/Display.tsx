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
  neutral,
  pointing,
  shrug,
  smiling,
  std,
  surprised,
  tableflip,
} from "../lib/emotes";
import Group from "../components/Group";
import "../styles/display.scss";
import Information from "../components/Information";
import Tooltip from "../components/Tooltip";
import Navigation from "../components/Navigation";
import { usePreferences } from "../lib/preferences";

function Display() {
  /* State */
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [favorites, setFavorites] = useState<Array<string>>([]);

  const preferences = usePreferences();

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
    const replaceSlashes = preferences.get<boolean>("slashes", false);
    if (replaceSlashes) {
      emote = emote.replace("/", "／").replace("\\", "＼");
    }

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

      // Display message
      spawnTooltip("Added to favorites!");
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
    neutral,
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

  return (
    <>
      <Information />
      <div className="Display">
        {favorites.length > 0 && (
          <Group
            name="Favorites"
            content={favorites}
            onClick={(kao) => copy(kao)}
            onRightClick={toggleFavorite}
          />
        )}
        {display}
      </div>
      <Navigation groupNames={names} />
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
