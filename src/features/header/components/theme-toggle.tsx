"use client";

import { Loader } from "@/components/ui/loader";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
	const [mounted, setMounted] = useState(false);
	const { systemTheme, theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	const renderThemeChanger = () => {
		if (!mounted) {
			return <Loader className="size-6 text-foreground" />;
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
