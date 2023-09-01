import type { MultipleTeensiesFormData } from "@/types";
import { atom } from "jotai";

export const multipleFormAtom = atom<MultipleTeensiesFormData[]>([
  {
    slug: "",
    url: "",
    isPasswordProtected: false,
  },
]);
