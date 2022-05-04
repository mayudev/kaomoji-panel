import { useEffect, useState } from "react";
import { usePreferences } from "../../lib/preferences";

type PrefType = "checkbox" | "input";

type Props = {
  property: string;
  name: string;
  description?: string;
  type: PrefType;
  onUpdate?(newValue: boolean | string): void;
};

function Preference(props: Props) {
  const preferences = usePreferences();

  const [value, setValue] = useState(props.type === "checkbox" ? false : "");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let currentValue;
    if (props.type === "checkbox") {
      // For checkbox
      currentValue = preferences.get<boolean>(props.property, false);
    } else {
      // For input
      currentValue = preferences.get<string>(props.property, "");
    }

    setValue(currentValue);
    setLoaded(true);
  }, []);

  function updateValue(newValue: boolean | string) {
    // Update value locally
    setValue(newValue);

    // Delete the entry if it's empty
    if (typeof newValue === "string" && newValue.length === 0) {
      preferences.remove(props.property);
    } else {
      // Update in localStorage
      preferences.set(props.property, newValue);
    }

    // Call external handler
    if (props.onUpdate) props.onUpdate(newValue);
  }

  const checkboxControl = () => {
    return (
      <div className="Preference__checkbox">
        <input
          className="Checkbox__element"
          type="checkbox"
          onChange={(e) => updateValue(e.target.checked)}
          checked={value as boolean}
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

  const inputControl = () => {
    return (
      <div className="Preference__input">
        <input
          className="input__element"
          type="text"
          onChange={(e) => updateValue(e.target.value)}
          value={value as string}
        />
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
        {loaded ? (
          props.type === "checkbox" ? (
            checkboxControl()
          ) : (
            inputControl()
          )
        ) : (
          <div className="Preference__checkbox" style={{ width: "64px" }}></div>
        )}
      </div>
    </label>
  );
}

export default Preference;
