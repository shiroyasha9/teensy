import classnames from "classnames";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = {
  invalid?: boolean;
  label?: string;
  inlineLabel?: boolean;
  variant?: "primary" | "modal";
};

const Input = (
  props: Props &
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
) => {
  const {
    className: overrideClassName,
    invalid,
    label,
    inlineLabel,
    id,
    variant = "primary",
    ...rest
  } = props;

  const classNames = classnames(
    "my-1 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 sm:px-2 sm:text-sm dark:bg-gray-700",
    {
      "text-black dark:text-gray-200":
        (variant === "primary" || variant === "modal") && !invalid,
      "focus:border-lemon-400 focus:ring-lemon-400":
        variant === "primary" && !invalid,
      "focus:border-purple-600 focus:ring-purple-600 dark:focus:border-lemon-400 dark:focus:ring-lemon-400":
        variant === "modal" && !invalid,
      "border-red-450 text-red-450 focus:border-red-450 focus:ring-red-450":
        invalid,
      [overrideClassName || ""]: !!overrideClassName,
    },
  );

  const containerClassNames = classnames("w-full", {
    "flex items-center": inlineLabel,
  });

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
      <input id={id} className={classNames} {...rest} />
    </div>
  );
};

export default Input;
