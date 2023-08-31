import type { FormData, MultipleTeensiesFormData } from "@/types";
import { atom } from "jotai";

export const formAtom = atom<FormData>({
  slug: "",
  url: "",
  isPasswordProtected: false,
  isAutoDelete: false,
});
export const multipleFormAtom = atom<MultipleTeensiesFormData[]>([
  {
    slug: "",
    url: "",
    isPasswordProtected: false,
  },
]);

export const showAuthModalAtom = atom<boolean>(false);
