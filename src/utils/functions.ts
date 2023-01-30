import { SLUG_CHARACTERS } from "$constants";
import { customAlphabet } from "nanoid";

export function isValidEmail(email: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export const nanoidForSlug = customAlphabet(SLUG_CHARACTERS, 5);
