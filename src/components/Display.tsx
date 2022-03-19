import emotes from "../lib/emotes";
import Kaomoji from "./Kaomoji";

function Display() {
  function copy(emote: string) {
    navigator.clipboard.writeText(emote);
  }

  const display = emotes.map((emoji) => (
    <Kaomoji onClick={(emote) => copy(emote)} content={emoji} />
  ));
  return <div>{display}</div>;
}

export default Display;
