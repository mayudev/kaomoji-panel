import "../styles/tooltip.scss";

type Props = {
  message: string;
};

function Tooltip(props: Props) {
  return (
    <div className="Tooltip">
      <div className="Tooltip__content">{props.message}</div>
    </div>
  );
}

export default Tooltip;
