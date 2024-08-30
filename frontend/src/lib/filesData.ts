export type fileTreeType = {
  id: number;
  name: string;
  type: "FILE" | "FOLDER";
  parent: null | number;
  children: null | fileTreeType[];
};

export const fileTree: fileTreeType = {
  id: 1,
  name: "root",
  type: "FOLDER",
  parent: null,
  children: [
    {
      id: 2,
      name: "index.js",
      type: "FILE",
      parent: 1,
      children: null,
    },
    {
      id: 9,
      name: "src",
      type: "FOLDER",
      parent: 1,
      children: [
        {
          id: 5,
          name: "index.js",
          type: "FILE",
          parent: 9,
          children: null,
        },
        {
          id: 6,
          name: "src",
          type: "FOLDER",
          parent: 9,
          children: null,
        },
        {
          id: 7,
          name: "index.ts",
          type: "FILE",
          parent: 9,
          children: null,
        },
      ],
    },
    {
      id: 4,
      name: "index.ts",
      type: "FILE",
      parent: 1,
      children: null,
    },
    {
      id: 3,
      name: "src",
      type: "FOLDER",
      parent: 1,
      children: [
        {
          id: 10,
          name: "index.js",
          type: "FILE",
          parent: 3,
          children: null,
        },
        {
          id: 11,
          name: "src",
          type: "FOLDER",
          parent: 3,
          children: null,
        },
        {
          id: 12,
          name: "index.ts",
          type: "FILE",
          parent: 3,
          children: null,
        },
      ],
    },
  ],
};