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
        description="s"
      />
    </>
  );
}

export default Preferences;
