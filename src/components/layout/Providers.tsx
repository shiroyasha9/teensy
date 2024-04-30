"use client";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "next-themes";

type ProviderProps = {
	children: React.ReactNode;
};

const Providers = ({ children }: ProviderProps) => {
	return (
		<TRPCReactProvider>
			<ThemeProvider enableSystem={true} attribute="class">
				{children}
			</ThemeProvider>
		</TRPCReactProvider>
	);
};

export default Providers;
