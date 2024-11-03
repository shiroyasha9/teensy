"use client";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "../ui/tooltip";

type ProviderProps = {
	children: React.ReactNode;
};

const Providers = ({ children }: ProviderProps) => {
	return (
		<TRPCReactProvider>
			<ThemeProvider enableSystem={true} attribute="class">
				<TooltipProvider>{children}</TooltipProvider>
			</ThemeProvider>
		</TRPCReactProvider>
	);
};

export default Providers;
