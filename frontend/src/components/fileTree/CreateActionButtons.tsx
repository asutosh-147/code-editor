import React from "react";
import { VscNewFile, VscNewFolder } from "react-icons/vsc";
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

export default CreateActionButtons;
