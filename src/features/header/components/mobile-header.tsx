"use client";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";
import { NAV_ITEMS } from "../constants";
import AuthButton from "./auth-button";
import { NavLink } from "./nav-link";
import SocialIcons from "./social-icons";

type MobileHeaderProps = {
	name?: string | null;
	email?: string | null;
	image?: string | null;
	className?: string;
};

const MobileHeader = ({ name, email, image, className }: MobileHeaderProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const isLoggedIn = name && email;

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger className={cn("border-none bg-transparent", className)}>
				<HamburgerMenuIcon className="size-6" aria-hidden="true" />
			</SheetTrigger>
			<SheetContent className="flex flex-col gap-0 p-2">
				<SheetHeader className="p-4">
					<SheetTitle className="text-left text-2xl text-primary">
						<Link href="/">
							<SheetClose>teensy</SheetClose>
						</Link>
					</SheetTitle>
				</SheetHeader>
				<nav className="flex flex-1 flex-col">
					{NAV_ITEMS.map((item) => {
						if (item.disabled) {
							return null;
						}

						if (item.subItems) {
							return (
								<Accordion type="single" collapsible key={item.name}>
									<AccordionItem value={item.name} className="border-b-0">
										<AccordionTrigger className="flex items-center justify-start gap-2 px-4 py-3 font-normal data-[state=open]:pb-4">
											<item.icon className="size-5" />
											{item.name}
										</AccordionTrigger>
										<AccordionContent className="flex flex-col gap-2 px-4">
											{item.subItems.map((subItem) => {
												return (
													<SheetClose key={subItem.name}>
														<NavLink
															href={subItem.href}
															name={subItem.name}
															icon={subItem.icon}
															description={subItem.description}
														/>
													</SheetClose>
												);
											})}
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							);
						}

						return (
							<SheetClose key={item.name} asChild>
								<NavLink
									href={item.href}
									name={item.name}
									icon={item.icon}
									className="px-4"
								/>
							</SheetClose>
						);
					})}
				</nav>
				<SheetFooter className="flex items-center justify-between p-4">
					<AuthButton
						name={name}
						email={email}
						image={image}
						onClick={handleClose}
					/>
					{!isLoggedIn && (
						<div className="flex items-center gap-x-2">
							<SocialIcons onClick={handleClose} />
						</div>
					)}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};

export default MobileHeader;
