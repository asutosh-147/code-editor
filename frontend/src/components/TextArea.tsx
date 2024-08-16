import React from "react";
import { cn } from "../lib/styling";
type textAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  text?: string | null;
  className?: string;
};
const TextArea = ({ text, className, ...props }: textAreaProps) => {
  return (
    <textarea
      className={cn(
        className,
        "h-full p-4 rounded-md outline-none bg-gray-50 shadow-lg dark:bg-zinc-900 hover:ring-4 focus:ring-4 ring-zinc-500 transition-all duration-300 resize-none"
      )}
      {...props}
      value={text!}
    >
      {text}
    </textarea>
  );
};

export default TextArea;
