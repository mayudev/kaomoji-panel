import BackButton from "../components/preferences/BackButton";
import Preference from "../components/preferences/Preference";
import "../styles/preferences.scss";

type Props = {
  onReturn: () => void;
};

function Preferences(props: Props) {
  const updateFont = (font: string | boolean) => {
    if (typeof font === "boolean") return;

    if (font.length === 0) document.body.style.fontFamily = "";
    else document.body.style.fontFamily = font + ",sans-serif";
  };

  const resetOrder = () => {
    localStorage.removeItem("order");
  };

  return (
    <>
      <BackButton onClick={props.onReturn} />
      <Preference
        property="slashes"
        name="Replace slashes with fullwidth slashes"
        description="In some cases, regular backslashes (\) might disappear when pasting. This replaces them with fullwidth slashes (／ and ＼)"
        type="checkbox"
      />
      <Preference
        property="font"
        name="Display font"
        description="Change font used by this extension"
        type="input"
        onUpdate={(font) => updateFont(font)}
      />
      <button className="Preference__button" onClick={resetOrder}>
        Reset tab order settings
      </button>
      <footer className="Preferences__footer">
        <a
          className="Preferences__link"
          href="https://github.com/mayudev/kaomoji-panel"
          target="_blank"
          rel="noreferrer"
        >
          Extension source code
        </a>
      </footer>
    </>
  );
}

export default Preferences;
