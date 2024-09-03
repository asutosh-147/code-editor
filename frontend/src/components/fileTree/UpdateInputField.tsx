import { FaChevronRight } from "react-icons/fa";
import Input from "../ui/Input";
import { UseFormRegisterReturn, UseFormReset } from "react-hook-form";

type UpdateInputFieldType = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isFile?: boolean;
  name?: string;
  onBlur: () => void;
  inputRegister: UseFormRegisterReturn;
  fileRegister: UseFormRegisterReturn;
  reset: UseFormReset<{
    name: string;
    isFile: boolean;
  }>;
};

const UpdateInputField = ({
  onSubmit,
  name = "",
  onBlur,
  isFile = false,
  inputRegister,
  fileRegister,
  reset,
}: UpdateInputFieldType) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    onSubmit(e);
    console.log("called");
    reset();
  };
  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      {isFile ? (
        <span>📄</span>
      ) : (
        <span className="flex items-center">
          <FaChevronRight className={`text-xs`} />
          📁
        </span>
      )}
      <Input
        {...inputRegister}
        type="text"
        defaultValue={name}
        autoFocus
        onBlur={onBlur}
        className="m-0 h-5 w-28 rounded-md p-0 px-1 py-0 text-black"
      />
      <input {...fileRegister} checked={isFile} type="checkbox" className="hidden" />
      <button type="submit" className="hidden"></button>
    </form>
  );
};

export default UpdateInputField;
