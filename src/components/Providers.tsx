"use client";

import TRPCProvider from "@/app/_trpc/TRPCProvider";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

type ProviderProps = {
  children: React.ReactNode;
};

const Providers = ({ children }: ProviderProps) => {
  return (
    <TRPCProvider>
      <SessionProvider>
        <ThemeProvider enableSystem={true} attribute="class">
          {children}
        </ThemeProvider>
      </SessionProvider>
    </TRPCProvider>
  );
};

export default Providers;
