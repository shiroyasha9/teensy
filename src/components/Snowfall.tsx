"use client";

import { useTheme } from "next-themes";
import Snowfall from "react-snowfall";
import colors from "tailwindcss/colors";

const SnowfallComponent = () => {
	const { theme } = useTheme();
	const color = theme === "dark" ? colors.white : colors.blue[200];

	return <Snowfall snowflakeCount={250} color={color} />;
};

export default SnowfallComponent;
