"use client";

// biome-ignore lint/style/noNamespaceImport: required
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = ({
	className,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) => (
	<AccordionPrimitive.Item className={cn("border-b", className)} {...props} />
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			className={cn(
				"flex flex-1 items-center justify-between py-4 text-left font-medium text-sm transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
				className,
			)}
			{...props}
		>
			{children}
			<ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = ({
	className,
	children,
	...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) => (
	<AccordionPrimitive.Content
		className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
		{...props}
	>
		<div className={cn("pt-0 pb-4", className)}>{children}</div>
	</AccordionPrimitive.Content>
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
