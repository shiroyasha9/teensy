import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";
import { Loader } from "./loader";
import {
	Tooltip,
	TooltipArrow,
	TooltipContent,
	TooltipTrigger,
} from "./tooltip";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
				outline:
					"border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	loading?: boolean;
	tooltip?: string;
	tooltipSide?: React.ComponentProps<typeof TooltipContent>["side"];
	ref?: React.Ref<HTMLButtonElement>;
}

const Button = ({
	className,
	variant,
	size,
	asChild = false,
	children,
	loading = false,
	tooltip,
	tooltipSide,
	disabled,
	...props
}: ButtonProps) => {
	const Comp = asChild ? Slot : "button";

	const buttonContent = (
		<Comp
			className={cn(
				buttonVariants({ variant, size, className }),
				tooltip && "disabled:pointer-events-auto",
			)}
			disabled={loading || disabled}
			{...props}
		>
			{loading && <Loader className="size-4 text-primary-foreground" />}
			{children}
		</Comp>
	);

	if (tooltip) {
		return (
			<Tooltip delayDuration={500}>
				<TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
				<TooltipContent side={tooltipSide}>
					{tooltip}
					<TooltipArrow />
				</TooltipContent>
			</Tooltip>
		);
	}

	return buttonContent;
};

Button.displayName = "Button";

export { Button, buttonVariants };
