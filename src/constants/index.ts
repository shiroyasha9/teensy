import type { AutoDeleteDropdownData } from "@/types";

export const SLUG_CHARACTERS = "0123456789abcdefghijklmnopqrstuvwxyz";

export const NOT_ALLOWED_SLUGS = new Set([
	"zeno",
	"gh",
	"me",
	"rick",
	"rickroll",
	"mubin",
	"anuj",
	"google",
	"wa",
	"teensies",
	"protected",
	"login",
	"blogs",
]);

export const AUTO_DELETE_OPTIONS: AutoDeleteDropdownData[] = [
	{
		label: "1 hour",
		minutesToExpire: 60,
	},
	{
		label: "4 hours",
		minutesToExpire: 60 * 4,
	},
	{
		label: "8 hours",
		minutesToExpire: 60 * 8,
	},
	{
		label: "1 day",
		minutesToExpire: 60 * 24,
	},
];

export const IS_DEV = process.env.NODE_ENV === "development";
// export const IS_DEV = false;
