import {
	BarChart2,
	Info,
	Link,
	Link2,
	MessageCircle,
	Search,
	Sparkles,
	Wrench,
} from "lucide-react";
import type { NavItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
	{
		name: "Teensy a link",
		href: "/",
		icon: Link2,
	},

	{
		name: "My Teensies",
		href: "/teensies/mine",
		icon: Link,
	},
	{
		name: "Analytics",
		href: "/teensies/analytics",
		icon: BarChart2,
	},
	{
		name: "Tools",
		icon: Wrench,
		subItems: [
			{
				name: "Contactless WhatsApp",
				href: "/wa",
				icon: MessageCircle,
				description: "Send WhatsApp messages without saving the number",
			},
			{
				name: "Let me Google that for you",
				href: "/ltgtfy-it",
				icon: Search,
				description: "For those people who can't take the effort to Google",
			},
		],
	},
	{
		name: "Features",
		href: "/features",
		icon: Sparkles,
	},
	{
		name: "About",
		href: "/about",
		icon: Info,
	},
];
