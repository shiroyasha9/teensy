import type { ReactNode } from "react";
import {
	Tooltip,
	TooltipArrow,
	TooltipContent,
	TooltipTrigger,
} from "./tooltip";

const TooltipHOC = ({
	children,
	tooltip,
	tooltipSide,
	delayDuration = 500,
	triggerClassName,
	contentClassName,
}: {
	children: ReactNode;
	tooltip: ReactNode;
	tooltipSide?: "top" | "right" | "bottom" | "left";
	delayDuration?: number;
	triggerClassName?: string;
	contentClassName?: string;
}) => {
	if (!tooltip) {
		return <>{children}</>;
	}

	return (
		<Tooltip delayDuration={delayDuration}>
			<TooltipTrigger asChild className={triggerClassName}>
				{children}
			</TooltipTrigger>
			<TooltipContent
				side={tooltipSide}
				avoidCollisions
				className={contentClassName}
			>
				{tooltip}
				<TooltipArrow />
			</TooltipContent>
		</Tooltip>
	);
};

export default TooltipHOC;
