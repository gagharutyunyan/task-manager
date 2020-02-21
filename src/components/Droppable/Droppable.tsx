import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnType } from "../../interfaces";
import Drag from "../Draggable/Draggable";

import "./Droppable.css";

interface Props {
  columnId: string;
  column: ColumnType;
}

const Drop = ({ columnId, column }: Props) => {
  return (
    <Droppable droppableId={columnId} key={columnId}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? "lightblue" : "lightgrey"
            }}
            className="o-calendar__box"
          >
            {column.items.map((item, index) => {
              return <Drag item={item} key={item.id} index={index} />;
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default Drop;
