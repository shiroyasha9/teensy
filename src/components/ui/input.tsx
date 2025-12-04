import type { LucideIcon } from "lucide-react";
import { cn } from "@/utils";
import { HelperText } from "./helper-text";
import { Label } from "./label";
import TooltipHOC from "./tooltip-hoc";

type Icon =
	| LucideIcon
	| ((props: React.ComponentProps<LucideIcon>) => React.ReactNode);

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	startIcon?: Icon;
	endIcon?: Icon;
	label?: string;
	helperText?: string | null;
	error?: boolean | string;
	iconClassName?: string;
	tooltip?: string;
	tooltipSide?: "top" | "right" | "bottom" | "left";
	containerClassName?: string;
	labelClassName?: string;
	ref?: React.Ref<HTMLInputElement>;
}

const Input = ({
	className,
	type,
	startIcon: StartIcon,
	endIcon: EndIcon,
	label,
	helperText,
	error,
	iconClassName,
	min,
	max,
	tooltip,
	tooltipSide = "top",
	containerClassName,
	labelClassName,
	ref,
	...props
}: InputProps) => {
	return (
		<div className={cn("flex flex-col gap-1.5", containerClassName)}>
			{!!label && (
				<Label className={cn(error ? "text-destructive" : "", labelClassName)}>
					{label}
				</Label>
			)}
			<div className="relative w-full">
				<TooltipHOC tooltip={tooltip} tooltipSide={tooltipSide}>
					<input
						type={type}
						className={cn(
							"peer flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
							className,
							{
								"pl-8": StartIcon,
								"pr-8": EndIcon,
								"border-destructive focus-visible:ring-destructive": error,
							},
						)}
						ref={ref}
						{...props}
					/>
				</TooltipHOC>
				<div className="text-muted-foreground peer-focus:text-ring">
					{StartIcon && (
						<div className="-translate-y-1/2 absolute top-1/2 left-1.5 transform">
							<StartIcon className={cn("size-5", iconClassName)} />
						</div>
					)}
					{EndIcon && (
						<div className="-translate-y-1/2 absolute top-1/2 right-3 transform cursor-pointer">
							<EndIcon className={cn("size-5", iconClassName)} />
						</div>
					)}
				</div>
			</div>
			{!!helperText && <HelperText>{helperText}</HelperText>}
		</div>
	);
};

Input.displayName = "Input";

export { Input };
