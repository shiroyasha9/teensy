import { atom } from "jotai";
import { FormData } from "../types";

export const formAtom = atom<FormData>({ slug: "", url: "" });

export const teenyUrlAtom = atom<string>("teeny.tk");

export const isSuccessfulAtom = atom<boolean>(false);
