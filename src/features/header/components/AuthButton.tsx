"use client";

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
import { AvatarIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type AuthButtonProps = {
	name?: string | null;
	email?: string | null;
	image?: string | null;
};

const AuthButton = ({ name, email, image }: AuthButtonProps) => {
	if (!(name && email)) {
		return (
			<Link
				href="/login"
				className={cn(
					buttonVariants({
						size: "sm",
						className: "font-semibold text-base",
					}),
				)}
			>
				Login
			</Link>
		);
	}

	return (
		<>
			<div className="flex flex-col gap-y-2 px-2 pb-2 md:hidden">
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
				<Button
					variant="ghost"
					className="h-auto justify-start p-0 font-normal text-sm"
					onClick={signOutServerFn}
				>
					Logout
				</Button>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger className="hidden md:flex md:px-4">
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
					<DropdownMenuItem
						className="cursor-pointer"
						onClick={signOutServerFn}
					>
						Logout
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default AuthButton;
