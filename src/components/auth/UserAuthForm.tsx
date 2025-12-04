"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { cn } from "@/utils";

const GoogleIcon = ({
	className,
	ariaLabel = "google icon",
}: {
	className?: string;
	ariaLabel?: string;
}) => {
	return (
		<svg
			viewBox="0 0 210 210"
			xmlns="http://www.w3.org/2000/svg"
			className={cn("size-5 fill-foreground hover:fill-primary", className)}
			aria-label={ariaLabel}
		>
			<title>Google Icon</title>
			<path
				d="M0,105C0,47.103,47.103,0,105,0c23.383,0,45.515,7.523,64.004,21.756l-24.4,31.696C133.172,44.652,119.477,40,105,40
				c-35.841,0-65,29.159-65,65s29.159,65,65,65c28.867,0,53.398-18.913,61.852-45H105V85h105v20c0,57.897-47.103,105-105,105
				S0,162.897,0,105z"
			/>
		</svg>
	);
};

const UserAuthForm = () => {
	const { mutate: signInHandler, isPending } = useMutation({
		mutationFn: async () =>
			await signIn.social({ provider: "google", callbackURL: "/" }),
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
			className="mx-auto flex h-[46px] w-full items-center justify-center space-x-2 rounded-md border p-2 text-zinc-500 hover:border-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 focus:outline-hidden focus:ring-4 focus:ring-zinc-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-zinc-200 disabled:hover:bg-transparent disabled:hover:text-zinc-500 dark:border-zinc-500 dark:text-zinc-300 dark:focus:ring-zinc-600 dark:hover:bg-zinc-600 dark:hover:text-zinc-200"
		>
			<GoogleIcon className="hover:fill-foreground" />
			<span>Sign in with Google</span>
		</button>
	);
};

export default UserAuthForm;
