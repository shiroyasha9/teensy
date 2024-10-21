"use server";
import { signIn, signOut } from "./auth";

export const signInServerFn = async () => {
	await signIn("google", {
		redirectTo: "/",
	});
};

export const signOutServerFn = async () => {
	await signOut({
		redirectTo: "/login",
	});
};
