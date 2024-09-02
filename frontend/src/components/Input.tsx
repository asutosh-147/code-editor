import { memo } from "react";
import TextArea from "./TextArea";
import { CodeAtomFamilyType } from "@/store/atoms/editor";
import { SetterOrUpdater } from "recoil";
type InputProps = {
  input: string;
  setInput: SetterOrUpdater<CodeAtomFamilyType | null>;
};
const Input = memo(({ input, setInput }: InputProps) => {
  return (
    <div className="flex flex-col gap-1 row-span-2 h-full w-full relative">
      <div className="font-bold tracking-wide absolute top-1 right-2">Input</div>
      <TextArea
        id="input"
        name="input"
        className="rounded-b-none rounded-tl-none"
        placeholder="Your Inputs Here..."
        text={input}
        onChange={(e) => {
          setInput(prev =>{
            if(e.target.value.length > 0 && prev){
              return {...prev,input:e.target.value}
            }
            return null;
          });
        }}
      />
    </div>
  );
})

export default Input;
