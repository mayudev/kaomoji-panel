import { useEffect, useState } from "react";
import BackButton from "../components/preferences/BackButton";
import Preference from "../components/preferences/Preference";
import { usePreferences } from "../lib/preferences";
import "../styles/preferences.scss";

type Props = {
  onReturn: () => void;
};

function Preferences(props: Props) {
  const preferences = usePreferences();
  const [slashes, setSlashes] = useState(false);

  useEffect(() => {
    const slashesPreference = preferences.get("slashes");
    if (slashesPreference === null) {
      setSlashes(false);
    } else if (JSON.parse(slashesPreference) === true) {
      setSlashes(true);
    } else {
      setSlashes(false);
    }
  }, []);

  useEffect(() => {
    preferences.set("slashes", slashes);
  }, [preferences, slashes]);

  return (
    <>
      <BackButton onClick={props.onReturn} />
      <Preference
        name="Replace slashes with fullwidth slashes"
        description="s"
        value={slashes}
        onChange={(newValue) => {
          setSlashes(newValue);
        }}
      />
    </>
  );
}

export default Preferences;
