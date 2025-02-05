import type { LucideIcon } from "lucide-react";

export type NavItem = {
	name: string;
	icon: LucideIcon;
	disabled?: boolean;
} & (
	| {
			href: string;
			subItems?: never;
	  }
	| {
			href?: never;
			subItems: {
				name: string;
				href: string;
				icon: LucideIcon;
				description?: string;
				disabled?: boolean;
			}[];
	  }
);
