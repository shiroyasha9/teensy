import { auth } from "@/server/auth";
import Link from "next/link";
import AuthButton from "./auth-button";
import MobileHeader from "./mobile-header";
import { NavMenu } from "./nav-menu";
import SocialIcons from "./social-icons";
import ThemeToggle from "./theme-toggle";

export async function Header() {
	const session = await auth();

	const user = session?.user;

	return (
		<div className="fixed inset-x-0 top-0 bg-background px-6 pt-4 pb-2 transition-colors duration-500 ease-in">
			<nav className="mx-auto flex h-10 items-center justify-between gap-x-2 md:max-w-screen-2xl">
				<Link href="/" className="z-10">
					<p className="text-4xl text-primary">teensy</p>
				</Link>
				<NavMenu className="hidden h-full md:flex" />
				<div className="z-10 flex items-center gap-x-3 md:gap-x-4">
					<ThemeToggle />
					<SocialIcons />
					<AuthButton
						name={user?.name}
						email={user?.email}
						image={user?.image}
						className="hidden md:flex"
					/>
					<MobileHeader
						name={user?.name}
						email={user?.email}
						image={user?.image}
						className="md:hidden"
					/>
				</div>
			</nav>
		</div>
	);
}
