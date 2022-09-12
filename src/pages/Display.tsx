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
  const [order, setOrder] = useState<Array<number>>([]);

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

    // Load tab order from localStorage
    const savedOrder = localStorage.getItem("order");
    if (savedOrder === null) return;

    const parsedOrder = JSON.parse(savedOrder);
    if (
      Array.isArray(parsedOrder) &&
      parsedOrder.every((item) => typeof item === "number")
    ) {
      setOrder(parsedOrder);
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

  const moveItem = (source: number, target: number) => {
    setOrder((order) => {
      const tempOrder = Array.from(order).reverse();

      const targetIndex = tempOrder.indexOf(target);
      const sourceIndex = tempOrder.indexOf(source);

      if (sourceIndex > -1 && targetIndex > -1) {
        tempOrder[targetIndex] = source;
        tempOrder.splice(sourceIndex, 1);
        tempOrder.splice(targetIndex + 1, 0, target);
      } else if (targetIndex > -1) {
        tempOrder.splice(targetIndex, 0, source);
      } else if (sourceIndex > -1) {
        tempOrder.splice(sourceIndex, 1);
        if (target !== source + 1) {
          for (let i = 0; i < target; i++) {
            if (i !== source && tempOrder.indexOf(i) === -1) {
              tempOrder.push(i);
            }
          }
          tempOrder.push(source, target);
        }
      } else {
        const min = Math.min(source, target);
        for (let i = 0; i < min; i++) {
          if (tempOrder.indexOf(i) === -1) {
            tempOrder.push(i);
          }
        }
        tempOrder.push(source, target);
      }

      tempOrder.reverse();
      return tempOrder;
    });
  };

  // Update favorites
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Update order
  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(order));
  }, [order]);

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

  const sortedGroups = groups.sort((a, b) => {
    if (order.indexOf(a.id) > order.indexOf(b.id)) return -1;
    else if (order.indexOf(b.id) > order.indexOf(a.id)) return 1;
    else return 0;
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
        {sortedGroups.map((group, i) => (
          <Group
            name={group.title}
            key={i}
            content={group.contents}
            onClick={(kao) => copy(kao)}
            onRightClick={toggleFavorite}
          ></Group>
        ))}
      </div>
      <Navigation
        groups={sortedGroups}
        moveItem={(source, target) => moveItem(source, target)}
      />
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
