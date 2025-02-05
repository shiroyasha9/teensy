import { cn } from "@/utils";
import type { LucideIcon } from "lucide-react";
import Link, { type LinkProps } from "next/link";

type Props = LinkProps & {
	name: string;
	icon: LucideIcon;
	description?: string;
	className?: string;
};

export const NavLink = ({
	name,
	icon: Icon,
	description,
	className,
	...props
}: Props) => {
	return (
		<Link
			className={cn(
				"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none hover:bg-accent hover:text-primary focus:bg-accent focus:text-accent-foreground",
				className,
			)}
			{...props}
		>
			<div className="flex items-center gap-x-2 text-sm">
				<Icon className="size-5" />
				{name}
			</div>
			<p className="line-clamp-2 text-start text-muted-foreground text-sm leading-snug">
				{description}
			</p>
		</Link>
	);
};
