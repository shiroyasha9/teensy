"use client";

import { AvatarIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { MenubarSeparator } from "@/components/ui/menubar";
import { signOutServerFn } from "@/server/functions";
import { cn } from "@/utils";
import SocialIcons from "./social-icons";

type AuthButtonProps = {
	name?: string | null;
	email?: string | null;
	image?: string | null;
	className?: string;
	onClick?: () => void;
};

const AuthButton = ({
	name,
	email,
	image,
	className,
	onClick,
}: AuthButtonProps) => {
	if (!(name && email)) {
		return (
			<Link
				href="/login"
				className={cn(
					buttonVariants({
						size: "sm",
						className: "font-semibold text-base",
					}),
					className,
				)}
				onClick={onClick}
			>
				Login
			</Link>
		);
	}

	const handleLogout = () => {
		onClick?.();
		signOutServerFn();
	};

	return (
		<>
			{/* Mobile */}
			<div className={cn("flex w-full flex-col gap-y-2 md:hidden", className)}>
				<div className="flex items-center gap-x-2">
					<Avatar className="size-6">
						<AvatarImage src={image ?? undefined} />
						<AvatarFallback>
							<AvatarIcon className="size-full" />
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<Label>{name}</Label>
						<p className="text-muted-foreground text-xs">{email}</p>
					</div>
				</div>
				<MenubarSeparator />
				<div className="flex items-center justify-between">
					<Button
						size="sm"
						variant="outline"
						className="font-normal text-sm"
						onClick={handleLogout}
					>
						Logout
					</Button>
					<div className="flex items-center gap-x-2">
						<SocialIcons />
					</div>
				</div>
			</div>
			{/* Desktop */}
			<DropdownMenu>
				<DropdownMenuTrigger className="hidden md:flex">
					<Avatar className="size-6">
						<AvatarImage src={image ?? undefined} />
						<AvatarFallback>
							<AvatarIcon className="size-full" />
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>{name}</DropdownMenuLabel>
					<DropdownMenuItem>{email}</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default AuthButton;
