import { cn } from "@/utils/functions";

type ButtonProps = {
  title: string;
  variant?: "primary" | "secondary" | "outlined" | "tertiary" | "danger";
  type?: "button" | "submit" | "reset";
};

const Button = (props: ButtonProps & React.HTMLProps<HTMLButtonElement>) => {
  const {
    variant = "primary",
    type = "button",
    title,
    className: overrideClassName,
    disabled,
    ...rest
  } = props;

  const classNames = cn(
    "m-5 cursor-pointer rounded-md py-2 px-4 text-lg font-semibold disabled:cursor-not-allowed disabled:opacity-60",
    {
      "text-black":
        variant === "primary" ||
        variant === "secondary" ||
        variant === "danger",
      "bg-lemon-400 hover:bg-lemon-200": variant === "primary",
      "bg-white hover:bg-gray-200": variant === "secondary",
      "text-white": variant === "tertiary" || variant === "outlined",
      "border border-gray-300 hover:border-gray-400": variant === "outlined",
      "bg-purple-600 hover:bg-purple-900": variant === "tertiary",
      "bg-red-450 hover:bg-red-500": variant === "danger",
      [overrideClassName || ""]: !!overrideClassName,
    },
  );

  return (
    <button {...rest} type={type} className={classNames} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
