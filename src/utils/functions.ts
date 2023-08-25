import { SLUG_CHARACTERS } from "@/constants";
import { customAlphabet } from "nanoid";
import { toast } from "react-hot-toast";
import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidEmail(email: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export const nanoidForSlug = customAlphabet(SLUG_CHARACTERS, 5);

export function showToastMessage(message: string) {
  toast(message, {
    icon: "✅",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
}
export function showErrorMessage(message: string) {
  toast(message, {
    icon: "❌",
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
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
