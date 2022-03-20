import Kaomoji from "./Kaomoji";
import "../styles/group.scss";

type Props = {
  name: string;
  content: Array<string>;
  onClick: (content: string) => void;
};

export default function Group(props: Props) {
  return (
    <div className="Group" id={props.name}>
      <h5 className="Group__name">{props.name}</h5>
      <div className="Emotes">
        {props.content.map((kao) => (
          <Kaomoji onClick={(c) => props.onClick(c)} content={kao} key={kao} />
        ))}
      </div>
    </div>
  );
}
