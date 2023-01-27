import { customAlphabet } from "nanoid";

export function isValidEmail(email: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export const nanoidForSlug = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyz",
  5,
);
