import { useEffect, useState } from "react";
import { usePreferences } from "../../lib/preferences";

type Props<T> = {
  property: string;
  name: string;
  description?: string;
};

function Preference(props: Props<boolean>) {
  const preferences = usePreferences();
  const [value, setValue] = useState(false);

  useEffect(() => {
    const currentValue = preferences.get<boolean>(props.property, false);
    setValue(currentValue);
  }, []);

  function updateValue(newValue: boolean) {
    setValue(newValue);
    preferences.set(props.property, newValue);
  }

  const formControl = () => {
    return (
      <input
        type="checkbox"
        onChange={(e) => updateValue(e.target.checked)}
        checked={value}
      />
    );
  };

  return (
    <label>
      <div className="Preference">
        <p className="Preference__name">{props.name}</p>
        {formControl()}
      </div>
    </label>
  );
}

export default Preference;
