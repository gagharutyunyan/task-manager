import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ItemType } from "../../interfaces";

import "./Draggable.css";

interface Props {
  item: ItemType;
  index: number;
}

const Drag: React.FC<Props> = ({ item, index }) => {
  const { id } = item;
  const [dragToggle, setDragToggle] = useState<boolean>(false);
  const doubleClick = (elId: string): void => {
    if (elId === id) {
      setDragToggle(!dragToggle);
    }
  };
  return (
    <Draggable
      key={id}
      draggableId={id}
      isDragDisabled={dragToggle}
      index={index}
    >
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onDoubleClick={() => doubleClick(id)}
            className="o-calendar__box__item"
            style={{
              userSelect: "none",
              backgroundColor: dragToggle
                ? "#ccc"
                : snapshot.isDragging
                ? "#589ad4"
                : "#e8eff5",
              ...provided.draggableProps.style
            }}
          >
            <div className="o-calendar__box__item__inner">
              <div className="o-calendar__box__item__inner__container">
                <div className="o-calendar__box__item__car-number">
                  {item.content}
                </div>
                <div className="o-calendar__box__item__times">
                  07:00 - 08:10
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Drag;
