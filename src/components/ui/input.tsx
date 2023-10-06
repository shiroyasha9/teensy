import { cn } from "@/utils";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  label?: string;
  inlineLabel?: boolean;
  noContainer?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    className: overrideClassName,
    invalid,
    label,
    inlineLabel,
    noContainer,
    id,
    ...rest
  } = props;

  const classNames = cn(
    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
    {
      "border-red-450 text-red-450 focus:border-red-450 focus:ring-red-450":
        invalid,
    },
    overrideClassName,
  );

  const containerClassNames = cn("w-full", {
    "flex items-center": inlineLabel,
    "space-y-1.5": !inlineLabel,
  });

  const content = <input id={id} className={classNames} ref={ref} {...rest} />;

  if (noContainer) {
    return content;
  }

  return (
    <div className={containerClassNames}>
      {label && (
        <label
          htmlFor={id}
          className="mr-2 whitespace-nowrap text-sm font-medium"
        >
          {label}
        </label>
      )}
      {content}
    </div>
  );
});

Input.displayName = "Input";

export { Input };
