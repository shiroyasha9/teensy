import classNames from "classnames";

type ButtonProps = {
  title: string;
  variant?: "primary" | "secondary" | "outlined";
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

  const buttonClassNames = classNames({
    "m-5 cursor-pointer rounded-md py-2 px-3 text-lg font-semibold text-gray-950":
      true,
    "bg-lemon-400": variant === "primary",
    "bg-white": variant === "secondary",
    "border-2 border-lemon-400 text-gray-50 font-normal":
      variant === "outlined",
    "bg-gray-200/70": disabled,
  });

  return (
    <button
      {...rest}
      className={`${buttonClassNames} ${overrideClassName}`}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
