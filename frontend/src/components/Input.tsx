import { Dispatch, SetStateAction } from "react";
import TextArea from "./TextArea";
type InputProps = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
};
const Input = ({ input, setInput }: InputProps) => {
  return (
    <div className="flex flex-col gap-1 row-span-2 h-full w-full relative">
      <div className="font-bold tracking-wide absolute top-1 right-2">Input</div>
      <TextArea
        id="input"
        name="input"
        className="rounded-b-none"
        placeholder="Your Inputs Here..."
        text={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
