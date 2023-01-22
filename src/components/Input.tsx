import classnames from "classnames";
import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = {
  invalid?: boolean;
  label?: string;
  inlineLabel?: boolean;
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
    ...rest
  } = props;

  const classNames = classnames(
    "my-1 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 text-black placeholder-slate-400 shadow-sm focus:border-lemon-400 focus:outline-none focus:ring-1 focus:ring-lemon-400 sm:px-2 sm:text-sm",
    {
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
