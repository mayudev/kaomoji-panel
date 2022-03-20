import { group1, group2, group3, group4 } from "../lib/emotes";
import Group from "./Group";
import "../styles/display.scss";

function Display() {
  /**
   * Copy emoji to clipboard
   */
  const copy = (emote: string) => {
    navigator.clipboard.writeText(emote);
  };

  const groups = [group1, group2, group3, group4];

  const display = groups.map((group) => {
    if (group.length === 0) return false;

    // First element of the array is the group name
    const groupName = group[0];

    return (
      <Group
        name={groupName}
        key={groupName}
        content={group.slice(1)}
        onClick={(kao) => copy(kao)}
      />
    );
  });

  return (
    <>
      <div className="Display">{display}</div>
      <footer>
        <a href="#Group3">group3</a>
      </footer>
    </>
  );
}

export default Display;
