import { useDrag, useDrop } from "react-dnd";
import type { Identifier } from "dnd-core";
import { useState } from "react";

type Props = {
  group: string;
  active: boolean;
  id: number;
  onClick: () => void;
  moveItem: (source: number, target: number) => void;
};

type DragItem = {
  id: number;
};

function NavigationCard({ group, active, id, onClick, moveItem }: Props) {
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >(() => ({
    accept: "category",
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    drop(item, monitor) {
      const dropId = id;
      const dragId = item.id;

      if (dragId === dropId) return;

      moveItem(dragId, dropId);
    },
  }));

  const [{ isDragging }, drag] = useDrag({
    type: "category",
    item: () => {
      return { id };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <>
      <a
        ref={(node) => drag(drop(node))}
        href={"#" + group}
        className={`Link ${active ? "Link--active" : ""}`}
        onClick={onClick}
      >
        {group}
      </a>
    </>
  );
}

export default NavigationCard;
