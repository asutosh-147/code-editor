import { cn } from "@/lib/utils";
import React from "react";
import { forwardRef } from "react";
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, label, className, ...props }, ref) => {
    return (
      <div className="flex flex-col items-start gap-1">
        <p className="text-xs font-semibold">{label ? label : ""}</p>
        <div className="relative w-full">
          {children}
          <input
            ref={ref}
            {...props}
            className={cn(
              "w-full rounded-md py-1 text-sm text-gray-600 focus:outline-none focus:ring-2 ring-black transition-all duration-100",
              className,
              {
                "px-8": children,
              },
            )}
          />
        </div>
      </div>
    );
  },
);

export default Input;
