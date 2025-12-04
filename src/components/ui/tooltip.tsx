"use client";

// biome-ignore lint/performance/noNamespaceImport: required
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "@/utils";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = ({
	className,
	sideOffset = 4,
	ref,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) => (
	<TooltipPrimitive.Portal>
		<TooltipPrimitive.Content
			ref={ref}
			sideOffset={sideOffset}
			className={cn(
				"fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 animate-in overflow-hidden rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-xs data-[state=closed]:animate-out",
				className,
			)}
			{...props}
		/>
	</TooltipPrimitive.Portal>
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const TooltipArrow = ({
	className,
	ref,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Arrow>) => (
	<TooltipPrimitive.Arrow
		ref={ref}
		className={cn(
			"fade-in-0 zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 animate-in fill-primary stroke-2 stroke-border data-[state=closed]:animate-out",
			className,
		)}
		{...props}
	/>
);
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

export {
	Tooltip,
	TooltipTrigger,
	TooltipContent,
	TooltipArrow,
	TooltipProvider,
};
