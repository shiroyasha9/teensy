"use client";

import { cn } from "@/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type { ClassAttributes, HTMLAttributes } from "react";

const helperTextVariants = cva("break-words text-xs leading-tight", {
	variants: {
		variant: {
			default: "text-muted-foreground",
			destructive: "text-destructive",
			outline: "hover:text-accent",
			secondary: "text-secondary",
			ghost: "hover:bg-accent hover:text-accent",
			link: "text-primary underline-offset-4 hover:underline",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

type Props = ClassAttributes<HTMLParagraphElement> &
	HTMLAttributes<HTMLParagraphElement> &
	VariantProps<typeof helperTextVariants>;

export const HelperText = ({ className, variant, ...props }: Props) => (
	<p className={cn(helperTextVariants({ variant, className }))} {...props} />
);
