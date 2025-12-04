import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import type { FC } from "react";
import Login from "@/components/auth/Login";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";

const Page: FC = () => {
	return (
		<div>
			<Link
				href="/"
				className={cn(
					buttonVariants({
						variant: "ghost",
					}),
					"-mt-20 space-x-2 self-start",
				)}
			>
				<ChevronLeftIcon className="size-4" />
				<span>Home</span>
			</Link>
			<Login />
		</div>
	);
};

export default Page;
