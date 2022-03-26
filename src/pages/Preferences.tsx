import BackButton from "../components/preferences/BackButton";
import Preference from "../components/preferences/Preference";
import "../styles/preferences.scss";

type Props = {
  onReturn: () => void;
};

function Preferences(props: Props) {
  return (
    <>
      <BackButton onClick={props.onReturn} />
      <Preference
        property="slashes"
        name="Replace slashes with fullwidth slashes"
        description="In some cases, regular backslashes (\) might disappear when pasting. This replaces them with fullwidth slashes (／ and ＼)"
      />
    </>
  );
}

export default Preferences;
