import { Dispatch, SetStateAction } from "react";
import TextArea from "./TextArea";
type InputProps = {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
};
const Input = ({ input, setInput }: InputProps) => {
  return (
    <div className="flex flex-col gap-1 row-span-2">
      <div className="font-bold tracking-wide">Input</div>
      <TextArea
        id="input"
        name="input"
        placeholder="write input here"
        text={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
