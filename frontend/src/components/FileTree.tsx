import React, { useRef } from "react";
import { useState } from "react";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";
import { fileTreeType } from "@/lib/filesData";
import { RiDeleteBin7Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import UpdateInputField from "./UpdateInputField";

type FileTreeProps = {
  data: fileTreeType;
  insertNode: (node: fileTreeType) => void;
  deleteNode: (node: fileTreeType) => void;
  updateNode: (node: fileTreeType) => void;
};

const FileTree = ({
  data,
  insertNode,
  deleteNode,
  updateNode,
}: FileTreeProps) => {
  const [open, setOpen] = useState(false);
  const [inputOpen, setInputOpen] = useState({ open: false, isFile: false });
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  const updateRef = useRef<null | HTMLInputElement>(null);
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

  const handleUpdateNode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateRef.current)
      updateNode({ ...data, name: updateRef.current.value });
    setUpdateOpen(false);
  };

  const handleToggleUpdate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setUpdateOpen((prev) => !prev);
  };
  return (
    <div className="w-max cursor-pointer px-1 text-white">
      {data.type === "FILE" ? (
        <div className="group flex items-center justify-between gap-5 rounded-sm px-1 transition-all duration-300 hover:bg-zinc-600">
          <div className="flex items-center">
            {updateOpen ? (
              <UpdateInputField
                ref={updateRef}
                onSubmit={handleUpdateNode}
                name={data.name}
                onBlur={() => setUpdateOpen(false)}
                nodeIcon="📄"
              />
            ) : (
              <>📄 {data.name}</>
            )}
          </div>
          <div className="space-x-2">
            <FileActionButtons
              deleteOnClick={handleDeleteNode}
              updateOnClick={handleToggleUpdate}
            />
          </div>
        </div>
      ) : (
        <>
          <div
            onClick={toggleOpen}
            className="group flex items-center justify-between gap-5 rounded-sm px-1 transition-all duration-300 hover:bg-zinc-600"
          >
            <div className="flex items-center">
              {updateOpen ? (
                <UpdateInputField
                  ref={updateRef}
                  onSubmit={handleUpdateNode}
                  name={data.name}
                  onBlur={() => setUpdateOpen(false)}
                  nodeIcon="📁"
                />
              ) : (
                <>📁 {data.name}</>
              )}
            </div>
            <div className="flex items-center gap-2">
              <CreateActionButtons toggleInputFolder={toggleInputFolder} />
              {data.parent && (
                <FileActionButtons
                  deleteOnClick={handleDeleteNode}
                  updateOnClick={handleToggleUpdate}
                />
              )}
            </div>
          </div>
          {inputOpen.open && (
            <div className="pl-6">
              <UpdateInputField
                onSubmit={handleNewFolder}
                onBlur={() =>
                  setInputOpen((prev) => ({ ...prev, open: false }))
                }
                ref={inputRef}
                nodeIcon={inputOpen.isFile ? "📄" : "📁"}
              />
            </div>
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
              updateNode={updateNode}
            />
          ))}
      </div>
    </div>
  );
};

export default FileTree;

const FileActionButtons = ({
  deleteOnClick,
  updateOnClick,
}: {
  deleteOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  updateOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <>
      <button
        name="delete"
        onClick={deleteOnClick}
        className="opacity-0 transition-all duration-300 group-hover:opacity-100"
      >
        <RiDeleteBin7Line className="text-sm text-white" />
      </button>
      <button
        name="update"
        onClick={updateOnClick}
        className="opacity-0 transition-all duration-300 group-hover:opacity-100"
      >
        <MdOutlineModeEditOutline className="text-sm text-white" />
      </button>
    </>
  );
};

const CreateActionButtons = ({
  toggleInputFolder,
}: {
  toggleInputFolder: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
}) => {
  return (
    <>
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
    </>
  );
};
