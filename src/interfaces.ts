export interface ColumnsType {
  [key: string]: {
    name: string;
    items: {
      id: string;
      content: string;
    }[];
  };
}

export interface ItemType {
  id: string;
  content: string;
}

export interface ColumnType {
  name: string;
  items: {
    id: string;
    content: string;
  }[];
}
