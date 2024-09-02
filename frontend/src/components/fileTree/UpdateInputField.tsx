// import { forwardRef } from "react";
import Input from "../ui/Input";
import { UseFormRegisterReturn } from "react-hook-form";
type UpdateInputFieldType = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isFile?: boolean;
  name?: string;
  onBlur: () => void;
  inputRegister: UseFormRegisterReturn;
  fileRegister: UseFormRegisterReturn;
};

const UpdateInputField = ({
  onSubmit,
  name = "",
  onBlur,
  isFile = false,
  inputRegister,
  fileRegister,
}: UpdateInputFieldType) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center"
    >
      {isFile ? "📄" : "📁"}
      <Input
        {...inputRegister}
        type="text"
        defaultValue={name}
        autoFocus
        onBlur={onBlur}
        className="m-0 h-5 w-28 rounded-md p-0 px-1 py-0 text-black"
      />
      <input
        {...fileRegister}
        checked={isFile}
        type="checkbox"
        className="hidden"
      />
      <button type="submit" className="hidden"></button>
    </form>
  );
};

export default UpdateInputField;
