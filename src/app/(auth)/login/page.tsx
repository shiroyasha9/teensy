import Login from "@/components/auth/Login";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";
import Link from "next/link";
import type { FC } from "react";
import { LuChevronLeft } from "react-icons/lu";

const Page: FC = () => {
	return (
		<div>
			<Link
				href="/"
				className={cn(
					buttonVariants({
						variant: "ghost",
					}),
					"-mt-20 self-start",
				)}
			>
				<LuChevronLeft className="mr-2 h-4 w-4" />
				Home
			</Link>
			<Login />
		</div>
	);
};

export default Page;
