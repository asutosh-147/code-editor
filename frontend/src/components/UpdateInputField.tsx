import { forwardRef } from "react";
import Input from "./ui/Input";

type UpdateInputFieldType = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  nodeIcon: "📄" | "📁";
  name?: string;
  onBlur: () => void;
};

const UpdateInputField = forwardRef<
  HTMLInputElement | null,
  UpdateInputFieldType
>(({ onSubmit, nodeIcon, name="", onBlur }, ref) => {
  return (
    <form onSubmit={onSubmit} className="flex items-center">
      {nodeIcon}
      <Input
        ref={ref}
        type="text"
        defaultValue={name}
        autoFocus
        onBlur={onBlur}
        className="m-0 h-5 w-28 rounded-md p-0 px-1 py-0 text-black"
      />
    </form>
  );
});

export default UpdateInputField;
