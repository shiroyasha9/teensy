import classnames from "classnames";

type ButtonProps = {
  title: string;
  variant?: "primary" | "secondary" | "outlined" | "tertiary";
  type?: "button" | "submit" | "reset";
};

const Button = (props: ButtonProps & React.HTMLProps<HTMLButtonElement>) => {
  const {
    variant = "primary",
    title,
    className: overrideClassName,
    disabled,
    ...rest
  } = props;

  const classNames = classnames(
    "m-5 cursor-pointer rounded-md py-2 px-3 text-lg font-semibold text-gray-950",
    {
      "bg-lemon-400 hover:bg-lemon-200": variant === "primary",
      "bg-white hover:bg-gray-200": variant === "secondary",
      "bg-white hover:bg-gray-200 border border-gray-300":
        variant === "outlined",
      "cursor-not-allowed disabled:opacity-60": disabled,
      "bg-purple-600 !text-white hover:!bg-purple-900 disabled:opacity-50":
        variant === "tertiary",
      [overrideClassName || ""]: !!overrideClassName,
    },
  );

  return (
    <button {...rest} className={classNames} disabled={disabled}>
      {title}
    </button>
  );
};

export default Button;
