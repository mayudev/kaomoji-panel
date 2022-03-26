type Props<T> = {
  name: string;
  description?: string;
  value: T;
  onChange: (newValue: T) => void;
};

function Preference(props: Props<boolean>) {
  const formControl = () => {
    return (
      <input
        type="checkbox"
        onChange={(e) => props.onChange(e.target.checked)}
        checked={props.value}
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
