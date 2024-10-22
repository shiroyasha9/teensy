"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOutServerFn } from "@/server/functions";
import { cn } from "@/utils";
import { AvatarIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { Label } from "../ui/label";
import { MenubarSeparator } from "../ui/menubar";

type AuthButtonProps = {
	name?: string | null;
	email?: string | null;
	image?: string | null;
};

const AuthButton = ({ name, email, image }: AuthButtonProps) => {
	if (name && email) {
		return (
			<>
				<div className="md:hidden flex flex-col gap-y-2 px-2 pb-2">
					<div className="flex items-center gap-x-2">
						<Avatar className="size-6">
							<AvatarImage src={image ?? undefined} />
							<AvatarFallback>
								<AvatarIcon className="size-full" />
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col">
							<Label>{name}</Label>
							<p className="text-xs text-muted-foreground">{email}</p>
						</div>
					</div>
					<MenubarSeparator />
					<Button
						variant="ghost"
						className="p-0 h-auto text-sm font-normal justify-start"
						onClick={signOutServerFn}
					>
						Logout
					</Button>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger className="md:px-4 hidden md:flex">
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
	}

	return (
		<Link
			href="/login"
			className={cn(
				buttonVariants(),
				"m-0 h-auto w-full px-4 py-2 text-base font-semibold md:ml-8 md:w-auto md:px-3 md:py-1",
			)}
		>
			Login
		</Link>
	);
};

export default AuthButton;
