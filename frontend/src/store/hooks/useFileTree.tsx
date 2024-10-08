import { fileTreeType } from "@/lib/filesData";
import { useRecoilState } from "recoil";
import { fileTreeAtom } from "../atoms/filetree";

const insertDfs = (newNode: fileTreeType, currNode: fileTreeType) => {
  const nodeCopy = {
    ...currNode,
    children: currNode.children ? [...currNode.children] : [],
  };
  if (newNode.parentId === currNode.id) {
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

  if (nodeCopy.children !== currNode.children) {
    return nodeCopy;
  }
  return currNode;
};

const deleteDfs = (delNode: fileTreeType, currNode: fileTreeType) => {
  const nodeCopy = {
    ...currNode,
    children: currNode.children ? [...currNode.children] : [],
  };
  if (delNode.parentId === nodeCopy.id) {
    nodeCopy.children = nodeCopy.children.filter(
      (child) => child.id != delNode.id,
    );
    return nodeCopy;
  } else {
    nodeCopy.children = nodeCopy.children.map((child) =>
      deleteDfs(delNode, child),
    );
  }

  return nodeCopy;
};

const updateDFS = (node: fileTreeType, currNode: fileTreeType) => {
  const nodeCopy = {
    ...currNode,
    children: currNode.children ? [...currNode.children] : [],
  };
  //TODO:change update logic`
  if (node.parentId === nodeCopy.id) {
    const index = nodeCopy.children.findIndex((child) => child.id === node.id);
    nodeCopy.children[index] = {...nodeCopy.children[index], name:node.name};
    return nodeCopy;
  } else {
    nodeCopy.children = nodeCopy.children.map((child) =>
      updateDFS(node, child),
    );
  }

  return nodeCopy;
};
export const useFileTree = () => {
  const [fileTreeData, setFileTreeData] = useRecoilState(fileTreeAtom);
  const insertNodeState = (newNode: fileTreeType) => {
    setFileTreeData((prevData) => insertDfs(newNode, { ...prevData }));
  };

  const deleteNodeState = (delNode: fileTreeType) => {
    setFileTreeData((prevData) => deleteDfs(delNode, { ...prevData }));
  };

  const updateNodeState = (updateNode: fileTreeType) => {
    setFileTreeData((prevData) => updateDFS(updateNode, {...prevData}));
  }

  return { fileTreeData, insertNodeState, deleteNodeState, updateNodeState };
};
