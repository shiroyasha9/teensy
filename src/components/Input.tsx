import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = {
  invalid?: boolean;
};

const Input = (
  props: Props &
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
) => {
  const { className: overrideClassName, invalid, ...rest } = props;

  return (
    <input
      {...rest}
      className={`my-1 block w-full rounded-md border border-slate-300 bg-white py-2 px-3 text-black placeholder-slate-400 shadow-sm focus:border-lemon-400 focus:outline-none focus:ring-1 focus:ring-lemon-400 sm:px-2 sm:text-sm ${
        invalid &&
        "border-red-500 text-red-500 focus:border-red-500 focus:ring-red-500"
      } ${overrideClassName}`}
    />
  );
};

export default Input;
