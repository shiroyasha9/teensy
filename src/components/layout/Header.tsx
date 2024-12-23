import { NAV_ITEMS } from "@/constants";
import { auth } from "@/server/auth";
import Link from "next/link";
import AuthButton from "./AuthButton";
import MobileHeader from "./MobileHeader";
import SocialIcons from "./SocialIcons";
import ThemeToggle from "./ThemeToggle";

export default async function HeaderNew() {
	const session = await auth();

	const user = session?.user;

	return (
		<div className="fixed inset-x-0 top-0 bg-background px-6 pt-4 pb-2 transition-colors duration-500 ease-in">
			<div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-2">
				<Link href="/" className="z-10">
					<p className="text-4xl text-primary">teensy</p>
				</Link>
				<div className="-my-2 -mr-2 flex items-center md:hidden">
					<ThemeToggle />
					<SocialIcons />
					<MobileHeader
						name={user?.name}
						email={user?.email}
						image={user?.image}
					/>
				</div>
				<nav className="absolute right-0 left-0 mx-auto hidden space-x-10 text-center md:block">
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.name}
							href={item.href}
							className=" hover:text-primary"
						>
							{item.name}
						</Link>
					))}
				</nav>
				<div className="z-10 hidden items-center justify-end md:flex">
					<ThemeToggle />
					<SocialIcons />
					<AuthButton
						name={user?.name}
						email={user?.email}
						image={user?.image}
					/>
				</div>
			</div>
		</div>
	);
}
