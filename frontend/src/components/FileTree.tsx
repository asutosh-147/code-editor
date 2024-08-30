import React, { useRef } from "react";
import { useState } from "react";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";
import Input from "./ui/Input";
import { fileTreeType } from "@/lib/filesData";
import { RiDeleteBin7Line } from "react-icons/ri";
type FileTreeProps = {
  data: fileTreeType;
  insertNode: (node: fileTreeType) => void;
  deleteNode: (node: fileTreeType) => void;
};

const FileTree = ({ data, insertNode, deleteNode }: FileTreeProps) => {
  const [open, setOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState({ open: false, isFile: false });
  const inputRef = useRef<null | HTMLInputElement>(null);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  const toggleInputFolder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setOpen(true);
    setInputOpen({
      open: true,
      isFile: e.currentTarget.name === "folder" ? false : true,
    });
  };
  const handleNewFolder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      insertNode({
        id: Math.random() * 100 + 20,
        children: null,
        name: inputRef.current.value,
        type: inputOpen.isFile ? "FILE" : "FOLDER",
        parent: data.id,
      });
    }
    setInputOpen((prev) => ({ ...prev, open: false }));
  };
  const handleDeleteNode = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    deleteNode(data);
  };
  return (
    <div className="w-44 cursor-pointer px-1 text-white">
      {data.type === "FILE" ? (
        <div className="group flex items-center justify-between gap-5 rounded-sm px-1 transition-all duration-300 hover:bg-zinc-600">
          <div>📄 {data.name}</div>
          <button
            name="file"
            onClick={handleDeleteNode}
            className="opacity-0 transition-all duration-300 group-hover:opacity-100"
          >
            <RiDeleteBin7Line className="text-sm text-white" />
          </button>
        </div>
      ) : (
        <>
          <div
            onClick={toggleOpen}
            className="group flex items-center justify-between gap-5 rounded-sm px-1 transition-all duration-300 hover:bg-zinc-600"
          >
            <div>📁 {data.name}</div>
            <div className="flex items-center gap-2">
              <button
                name="folder"
                onClick={toggleInputFolder}
                className="opacity-0 transition-all duration-300 group-hover:opacity-100"
              >
                <VscNewFolder className="text-sm text-white" />
              </button>
              <button
                name="file"
                onClick={toggleInputFolder}
                className="opacity-0 transition-all duration-300 group-hover:opacity-100"
              >
                <VscNewFile className="text-sm text-white" />
              </button>
              {data.parent && (
                <button
                  name="file"
                  onClick={handleDeleteNode}
                  className="opacity-0 transition-all duration-300 group-hover:opacity-100"
                >
                  <RiDeleteBin7Line className="text-sm text-white" />
                </button>
              )}
            </div>
          </div>
          {inputOpen.open && (
            <form onSubmit={handleNewFolder} className="flex items-center pl-6">
              <div>{inputOpen.isFile ? "📄" : "📁"}</div>
              <Input
                ref={inputRef}
                autoFocus
                onBlur={() =>
                  setInputOpen((prev) => ({ ...prev, open: false }))
                }
                type="text"
                className="m-0 h-5 w-28 rounded-md p-0 px-1 py-0 text-black"
              />
            </form>
          )}
        </>
      )}
      <div className="pl-4">
        {open &&
          data.children?.map((childData) => (
            <FileTree
              key={childData.id}
              data={childData}
              insertNode={insertNode}
              deleteNode={deleteNode}
            />
          ))}
      </div>
    </div>
  );
};

export default FileTree;
