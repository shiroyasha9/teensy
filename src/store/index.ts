import { atom } from "jotai";
import type { MultipleTeensiesFormData } from "@/types";

export const multipleFormAtom = atom<MultipleTeensiesFormData[]>([
	{
		slug: "",
		url: "",
		isPasswordProtected: false,
	},
]);
