import { SLUG_CHARACTERS } from "$constants";
import { customAlphabet } from "nanoid";
import { toast } from "react-hot-toast";

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
