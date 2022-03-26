type Props = {
  onClick: () => void;
};

function BackButton(props: Props) {
  return (
    <button className="BackButton" onClick={props.onClick}>
      <p className="BackButton__content">back</p>
    </button>
  );
}

export default BackButton;
