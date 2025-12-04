import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/utils";
import { NAV_ITEMS } from "../constants";
import { NavLink } from "./nav-link";

export const NavMenu = ({ className }: { className?: string }) => {
	return (
		<NavigationMenu className={className}>
			<NavigationMenuList>
				{NAV_ITEMS.map((item) => {
					if (item.disabled) {
						return null;
					}
					if (item.subItems) {
						return (
							<NavigationMenuItem key={item.name}>
								<NavigationMenuTrigger className="gap-x-2">
									<item.icon className="size-5" />
									{item.name}
								</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
										{item.subItems.map((component) => (
											<NavigationMenuLink key={component.name} asChild>
												<NavLink
													name={component.name}
													href={component.href}
													icon={component.icon}
													description={component.description}
												/>
											</NavigationMenuLink>
										))}
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>
						);
					}
					return (
						<NavigationMenuItem key={item.name}>
							<Link
								href={item.href}
								className={cn(navigationMenuTriggerStyle(), "gap-x-2")}
							>
								<item.icon className="size-5" />
								{item.name}
							</Link>
						</NavigationMenuItem>
					);
				})}
			</NavigationMenuList>
		</NavigationMenu>
	);
};
