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
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const currentValue = preferences.get<boolean>(props.property, false);
    setValue(currentValue);
    setLoaded(true);
  }, []);

  function updateValue(newValue: boolean) {
    setValue(newValue);
    preferences.set(props.property, newValue);
  }

  const formControl = () => {
    return (
      <div className="Preference__checkbox">
        <input
          className="Checkbox__element"
          type="checkbox"
          onChange={(e) => updateValue(e.target.checked)}
          checked={value}
        />
        <svg
          className={`Checkbox ${value ? "Checkbox--checked" : ""}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill={value ? "#FFFFFF" : "none"}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
        </svg>
      </div>
    );
  };

  return (
    <label>
      <div className="Preference">
        <p className="Preference__name">{props.name}</p>
        {props.description && (
          <p className="Preference__description">{props.description}</p>
        )}
        {loaded ? formControl() : <div style={{ width: "64px" }}></div>}
      </div>
    </label>
  );
}

export default Preference;
