import type { FormData, MultipleTeensiesFormData } from "$types";
import { atom } from "jotai";

export const formAtom = atom<FormData>({
  slug: "",
  url: "",
  isPasswordProtected: false,
});
export const multipleFormAtom = atom<MultipleTeensiesFormData[]>([
  {
    slug: "",
    url: "",
    isPasswordProtected: false,
  },
]);

export const teensyUrlAtom = atom<string>("teensy.tech");

export const isSuccessfulAtom = atom<boolean>(false);

export const showAuthModalAtom = atom<boolean>(false);
