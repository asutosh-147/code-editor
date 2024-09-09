import UpdateInputField from "./UpdateInputField";
import FileActionButtons from "./FileActionButtons";
import CreateActionButtons from "./CreateActionButtons";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { fileTreeType } from "@/lib/filesData";
import { backend_url } from "@/lib/constants";
import { toast } from "sonner";
import { FaChevronRight, FaFileCode, FaFolder, FaFolderOpen } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { inputTreeSchema, treeInputType } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecoilState } from "recoil";
import { currentFileIdAtom } from "@/store/atoms/editor";
import { useLang } from "@/store/hooks/useLang";

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
  const [fileId, setCurrentFileId] = useRecoilState(currentFileIdAtom);
  const setLang = useLang();
  const [open, setOpen] = useState(() => {
    return data.parentId === null ? true : false;
  });
  const [inputOpen, setInputOpen] = useState({ open: false, isFile: false });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<treeInputType>({
    resolver: zodResolver(inputTreeSchema),
  });
  const [updateOpen, setUpdateOpen] = useState(false);
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
    reset();
  };
  const handleNewNode = async (fieldData: treeInputType) => {
    const type = fieldData.isFile ? "FILE" : "FOLDER";
    try {
      const response = await axios.post(
        `${backend_url}/api/file/create`,
        {
          name: fieldData.name,
          type,
          parentId: data.id,
        },
        {
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        insertNode(response.data);
        if (fieldData.isFile) {
          setCurrentFileId(response.data.id);
          setLang(fieldData.name, true);
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.log(error.message);
    }
    setInputOpen({ isFile: false, open: false });
  };

  const handleDeleteNode = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`${backend_url}/api/file/delete`, {
        data: {
          nodeId: data.id,
        },
        withCredentials: true,
      });
      if (response.status === 200) {
        deleteNode(response.data);
        if (data.type === "FILE" && data.id === fileId) {
          setCurrentFileId(null);
        }
      }
    } catch (error: any) {
      toast(`Error in Deleting ${data.name}`);
      console.log(error.message);
    }
  };

  const handleUpdateNode = async (fieldData: treeInputType) => {
    try {
      const response = await axios.put(
        `${backend_url}/api/file/update`,
        {
          id: data.id,
          parentId: data.parentId,
          name: fieldData.name,
        },
        {
          withCredentials: true,
        },
      );
      if (response.status === 200) {
        updateNode({ ...response.data, children: data.children });
        if (fieldData.isFile) {
          setLang(fieldData.name, true);
        }
      }
    } catch (error: any) {
      toast(error.response.data.error);
      console.log(error.message);
    }
    setUpdateOpen(false);
  };

  const handleToggleUpdate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setUpdateOpen((prev) => !prev);
  };
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstError = Object.values(errors).at(0)?.message;
      toast.error(firstError || "An error occurred!");
      reset();
    }
  }, [errors, reset]);
  return (
    <div className="w-max cursor-pointer px-1 dark:text-white">
      {data.type === "FILE" ? (
        <div className="group flex items-center justify-between gap-5 rounded-sm px-1 transition-all duration-300 hover:bg-zinc-400 dark:hover:bg-zinc-600">
          <div className="flex items-center">
            {updateOpen ? (
              <UpdateInputField
                onSubmit={handleSubmit(handleUpdateNode)}
                name={data.name}
                onBlur={() => {
                  setUpdateOpen(false);
                }}
                reset={reset}
                isFile
                inputRegister={{ ...register("name") }}
                fileRegister={{ ...register("isFile") }}
              />
            ) : (
              <div
                onClick={() => {
                  setCurrentFileId(data.id);
                  setLang(data.name, true);
                }}
                className={`${fileId === data.id ? "rounded-md bg-zinc-200 pr-2 dark:bg-zinc-600" : ""} flex items-center gap-1`}
              >
                <FaFileCode className="text-zinc-600 dark:text-zinc-50" /> {data.name}
              </div>
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
            className="group flex items-center justify-between gap-5 rounded-sm px-1 transition-all duration-300 hover:bg-zinc-400 dark:hover:bg-zinc-600"
          >
            <div className="flex items-center">
              {updateOpen ? (
                <UpdateInputField
                  onSubmit={handleSubmit(handleUpdateNode)}
                  name={data.name}
                  onBlur={() => {
                    setUpdateOpen(false);
                  }}
                  inputRegister={{ ...register("name") }}
                  fileRegister={{ ...register("isFile") }}
                  isFile={false}
                  reset={reset}
                />
              ) : (
                <>
                  <div
                    className={`flex items-center transition-all duration-75 ${open ? "pt-1" : ""}`}
                  >
                    <FaChevronRight
                      className={`text-xs ${open ? "rotate-90" : ""}`}
                    />
                  </div>
                  <div className="flex items-center gap-1 pl-1">
                    {data.parentId === null ? (
                      ""
                    ) : (
                      <div>{open ? <FaFolderOpen className="text-zinc-600 dark:text-zinc-50" /> : <FaFolder className="text-zinc-600 dark:text-zinc-50" />}</div>
                    )}
                    {data.name}
                  </div>
                </>
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
                onSubmit={handleSubmit(handleNewNode)}
                onBlur={() => {
                  setInputOpen({ open: false, isFile: false });
                }}
                inputRegister={{ ...register("name") }}
                fileRegister={{ ...register("isFile") }}
                isFile={inputOpen.isFile}
                reset={reset}
              />
            </div>
          )}
        </>
      )}
      <div className={`pl-4 ${open ? "block" : "hidden"}`}>
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
