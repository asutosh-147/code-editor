import { fileTree, fileTreeType } from "@/lib/filesData";
import { useState } from "react";

const insertDfs = (newNode: fileTreeType, currNode: fileTreeType) => {
  const nodeCopy = {
    ...currNode,
    children: currNode.children ? [...currNode.children] : [],
  };
  if (newNode.parent === currNode.id) {
    if (nodeCopy.children) {
      nodeCopy.children.unshift(newNode);
    } else {
      nodeCopy.children = new Array(newNode);
    }
    return nodeCopy;
  }

  nodeCopy.children = nodeCopy.children.map((child) =>
    insertDfs(newNode, child),
  );

  return nodeCopy;
};

const deleteDfs = (delNode: fileTreeType, currNode: fileTreeType) => {
  const nodeCopy = {
    ...currNode,
    children: currNode.children ? [...currNode.children] : [],
  };
  if (delNode.parent === nodeCopy.id) {
    nodeCopy.children = nodeCopy.children.filter(
      (child) => child.id != delNode.id,
    );
    return nodeCopy;
  }
  nodeCopy.children = nodeCopy.children.map((child) =>
    deleteDfs(delNode, child),
  );

  return nodeCopy;
};

export const useFileTree = () => {
  const [fileTreeData, setFileTreeData] = useState(fileTree);
  const insertNodeState = (newNode: fileTreeType) => {
    setFileTreeData((prevData) => insertDfs(newNode, { ...prevData }));
  };
  const deleteNodeState = (delNode: fileTreeType) => {
    setFileTreeData((prevData) => deleteDfs(delNode, { ...prevData }));
  };
  return { fileTreeData, insertNodeState, deleteNodeState };
};
