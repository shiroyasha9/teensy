"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { systemTheme, theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
		document.body.classList.add("transition-colors", "duration-500", "ease-in");
	}, []);

	const renderThemeChanger = () => {
		if (!mounted) {
			return null;
		}
		const currentTheme = theme === "system" ? systemTheme : theme;

		if (currentTheme === "dark") {
			return (
				<Sun
					className="size-6 hover:text-primary"
					role="button"
					onClick={() => setTheme("light")}
				/>
			);
		}
		return (
			<Moon
				className="size-6 hover:text-primary"
				role="button"
				onClick={() => setTheme("dark")}
			/>
		);
	};
	return <div className="cursor-pointer">{renderThemeChanger()}</div>;
}
