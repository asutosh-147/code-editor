import React from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiDeleteBin7Line } from "react-icons/ri";

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
export default FileActionButtons;
