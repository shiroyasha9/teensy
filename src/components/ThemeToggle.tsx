"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("transition-colors", "duration-500", "ease-in");
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <MdOutlineLightMode
          className="h-7 w-7"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    } else {
      return (
        <MdOutlineDarkMode
          className="h-7 w-7"
          role="button"
          onClick={() => setTheme("dark")}
        />
      );
    }
  };
  return <div className="mr-2 cursor-pointer">{renderThemeChanger()}</div>;
}
