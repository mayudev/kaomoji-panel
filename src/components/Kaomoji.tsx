import "../styles/kaomoji.scss";

type Props = {
  content: string;
  onClick: (content: string) => void;
};

function Kaomoji(props: Props) {
  return (
    <span onClick={() => props.onClick(props.content)} className="Kaomoji">
      {props.content}
    </span>
  );
}

export default Kaomoji;
