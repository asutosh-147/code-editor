import { cn } from "@/lib/utils";
import { memo } from "react";

const Tooltip = memo(({
  title,
  position = "top",
}: {
  title: string;
  position?: "top" | "left" | "right" | "bottom";
}) => {
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-1",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-1",
    left: "right-full top-1/2 -translate-y-1/2 mr-1",
    right: "left-full top-1/2 -translate-y-1/2 ml-1",
  };
  return (
    <label
      className={cn(
        "back pointer-events-none absolute w-max scale-0 rounded-md dark:bg-zinc-900 bg-zinc-600 px-2 text-center text-sm font-semibold capitalize text-white transition-all duration-300 group-hover:scale-100",
        positionClasses[position]
      )}
    >
      {title}
    </label>
  );
})

export default Tooltip;
