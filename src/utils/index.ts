import { SLUG_CHARACTERS } from "@/constants";
import clsx, { type ClassValue } from "clsx";
import { customAlphabet } from "nanoid";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getBaseUrl = () => {
	if (typeof window !== "undefined") {
		return ""; // browser should use relative url
	}
	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
	}
	return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export function isValidEmail(email: string) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export const nanoidForSlug = customAlphabet(SLUG_CHARACTERS, 5);

export function showToastMessage(message: string) {
	toast.success(message, {
		icon: "✅",
	});
}
export function showErrorMessage(message: string) {
	toast.error(message, {
		icon: "❌",
	});
}

export const isDevEnvironment =
	process && process.env.NODE_ENV === "development";

export const getExpiryDate = (minutesToExpire: number) => {
	const date = new Date();
	date.setMinutes(date.getMinutes() + minutesToExpire);
	return date;
};

export const getRemaingTime = (expiryDate: Date) => {
	const now = new Date();
	const diff = expiryDate.getTime() - now.getTime();
	return Math.round(diff / 1000 / 60);
};

export const getFormattedTime = (minutes: number) => {
	if (minutes < 60) {
		return minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
	}

	const hours = Math.round(minutes / 60);
	if (hours < 24) {
		return hours === 1 ? `${hours} hour` : `${hours} hours`;
	}

	const days = Math.round(hours / 24);
	return days === 1 ? `${days} day` : `${days} days`;
};
