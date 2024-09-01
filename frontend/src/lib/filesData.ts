export type fileTreeType = {
  id: number;
  name: string;
  type: "FILE" | "FOLDER";
  parentId: null | number;
  children: fileTreeType[];
};

export const fileTree: fileTreeType = {
  id: 1,
  name: "root",
  type: "FOLDER",
  parentId: null,
  children: [
    {
      id: 2,
      name: "index.js",
      type: "FILE",
      parentId: 1,
      children: [],
    },
    {
      id: 9,
      name: "src",
      type: "FOLDER",
      parentId: 1,
      children: [
        {
          id: 5,
          name: "index.js",
          type: "FILE",
          parentId: 9,
          children: [],
        },
        {
          id: 6,
          name: "src",
          type: "FOLDER",
          parentId: 9,
          children: [],
        },
        {
          id: 7,
          name: "index.ts",
          type: "FILE",
          parentId: 9,
          children: [],
        },
      ],
    },
    {
      id: 4,
      name: "index.ts",
      type: "FILE",
      parentId: 1,
      children: [],
    },
    {
      id: 3,
      name: "src",
      type: "FOLDER",
      parentId: 1,
      children: [
        {
          id: 10,
          name: "index.js",
          type: "FILE",
          parentId: 3,
          children: [],
        },
        {
          id: 11,
          name: "src",
          type: "FOLDER",
          parentId: 3,
          children: [],
        },
        {
          id: 12,
          name: "index.ts",
          type: "FILE",
          parentId: 3,
          children: [],
        },
      ],
    },
  ],
};