import React from "react";
import "../styles/kaomoji.scss";

type Props = {
  content: string;
  onClick: (content: string) => void;
  onRightClick: (content: string) => void;
};

function Kaomoji(props: Props) {
  const handleRightClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    // Prevent context menu from opening
    e.preventDefault();

    // Let the parent handle it
    props.onRightClick(props.content);
  };

  return (
    <span
      onClick={() => props.onClick(props.content)}
      onContextMenu={handleRightClick}
      className="Kaomoji"
    >
      {props.content}
    </span>
  );
}

export default Kaomoji;
