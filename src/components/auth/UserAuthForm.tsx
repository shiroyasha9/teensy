"use client";

import { signInServerFn } from "@/server/functions";
import { useMutation } from "@tanstack/react-query";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const UserAuthForm = () => {
	const { mutate: signInHandler, isPending } = useMutation({
		mutationFn: async () => await signInServerFn(),
		onMutate: () => {
			toast.loading("Redirecting...");
		},
		onError: () => {
			toast.error("There was an error signing in.");
		},
	});

	return (
		<button
			type="button"
			disabled={isPending}
			onClick={() => signInHandler()}
			className="mx-auto flex h-[46px] w-full items-center justify-center space-x-2 rounded-md border p-2 text-zinc-500 transition-colors hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 focus:outline-none focus:ring-4 focus:ring-zinc-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-zinc-200 disabled:hover:bg-transparent disabled:hover:text-zinc-500 dark:border-zinc-500 dark:text-zinc-300 dark:hover:bg-zinc-600 dark:hover:text-zinc-200 dark:focus:ring-zinc-600"
		>
			<FcGoogle className="h-8 w-8" />
			<span>Sign in with Google</span>
		</button>
	);
};

export default UserAuthForm;
