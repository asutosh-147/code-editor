import React, { useRef } from "react";
import { useState } from "react";
import { fileTreeType } from "@/lib/filesData";
import UpdateInputField from "./UpdateInputField";
import FileActionButtons from "./FileActionButtons";
import CreateActionButtons from "./CreateActionButtons";
import axios from "axios";
import { backend_url } from "@/lib/constants";
import { toast } from "sonner";
import { FaChevronRight } from "react-icons/fa";

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

  const handleNewNode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      const type = inputOpen.isFile ? "FILE" : "FOLDER";
      try {
        const response = await axios.post(`${backend_url}/api/file/create`,{
          name: inputRef.current.value,
          type,
          parentId: data.id,
        },{
          withCredentials:true
        })
        if(response.status === 200){
          insertNode(response.data);
        }
      } catch (error:any) {
        toast(`Error in creating ${type}`);
        console.log(error.message);
      }
    }
    setInputOpen((prev) => ({ ...prev, open: false }));
  };

  const handleDeleteNode = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    try {
        const response = await axios.delete(`${backend_url}/api/file/delete`,{
          data:{
            nodeId:data.id
          },
          withCredentials:true
        })
        if(response.status === 200){
          deleteNode(response.data);
        }
    } catch (error:any) {
      toast(`Error in Deleting ${data.name}`);
      console.log(error.message);
    }
  };

  const handleUpdateNode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (updateRef.current){
      try {
        const response = await axios.put(`${backend_url}/api/file/update`,{
          id:data.id,
          name:updateRef.current.value
        },{
          withCredentials:true
        })
        if(response.status === 200){
          updateNode({...response.data,children:data.children});
        }
      } catch (error:any) {
        toast(`Error in Deleting ${data.name}`);
        console.log(error.message);
      }
    }
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
                <><div><FaChevronRight className={`text-xs ${open?"rotate-90":""}`} /></div>📁 {data.name}</>
              )}
            </div>
            <div className="flex items-center gap-2">
              <CreateActionButtons toggleInputFolder={toggleInputFolder} />
              {data.parentId && (
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
                onSubmit={handleNewNode}
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
      <div className={`pl-4 ${open ? "block":"hidden"}`}>
        {data.children?.map((childData) => (
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
