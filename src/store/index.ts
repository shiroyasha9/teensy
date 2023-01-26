import type { FormData } from "$types";
import { atom } from "jotai";

export const formAtom = atom<FormData>({ slug: "", url: "" });

export const teensyUrlAtom = atom<string>("teensy.tech");

export const isSuccessfulAtom = atom<boolean>(false);

export const showAuthModalAtom = atom<boolean>(false);
