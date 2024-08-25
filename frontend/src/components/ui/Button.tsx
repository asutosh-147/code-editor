import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import Spinner from "../Spinner";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, loading = false, ...props }: ButtonProps, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "scale-trans group relative flex items-center gap-2 rounded-md bg-zinc-600 px-2 py-1 text-sm font-semibold dark:bg-zinc-900",
          className,
          { "py-2": loading },
        )}
        {...props}
      >
        {loading ? <Spinner /> : children}
      </button>
    );
  },
);

export default Button;
