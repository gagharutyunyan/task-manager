import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import uuid from "uuid/v4";
import { ColumnsType } from "./interfaces";
import Drop from "./components/Droppable/Droppable";

import "./App.css";

const itemsFromBackend = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" }
];

const itemsFromBackend2 = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" }
];

const itemsFromBackend3 = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" }
];

const itemsFromBackend4 = [
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "First task" },
  { id: uuid(), content: "Second task" },
  { id: uuid(), content: "Third task" },
  { id: uuid(), content: "Fourth task" },
  { id: uuid(), content: "Fifth task" }
];

const columnsFromBackend = {
  [uuid()]: {
    name: "1 бокс",
    items: itemsFromBackend
  },
  [uuid()]: {
    name: "2 бокс",
    items: itemsFromBackend2
  },
  [uuid()]: {
    name: "3 бокс",
    items: itemsFromBackend3
  },
  [uuid()]: {
    name: "4 бокс",
    items: itemsFromBackend4
  }
};

const onDragEnd = (result: any, columns: any, setColumns: any): any => {
  if (!result.destination) return;
  const { source, destination } = result;
  console.log(source, destination, columns);
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

const App: React.FC = () => {
  const [columns, setColumns] = useState<ColumnsType>(columnsFromBackend);
  return (
    <div className="task-manager">
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column]) => {
          return (
            <div key={columnId}>
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Drop columnId={columnId} column={column} />
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
};

export default App;
