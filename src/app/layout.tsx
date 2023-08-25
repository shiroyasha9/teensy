import AddVisitCount from "@/components/AddVisitCount";
import Providers from "@/components/Providers";
import { cn } from "@/utils/functions";
import { Rubik } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "Teensy your URLs",
  description: "A Customizable URL shortener. Paste URL, give it a name, done!",
};

const rubik = Rubik({
  subsets: ["latin"],
});

type RootLayoutProps = {
  children: React.ReactNode;
  authModal: React.ReactNode;
};

export default function RootLayout({ children, authModal }: RootLayoutProps) {
  return (
    <html lang="en" className={cn("antialiased", rubik.className)}>
      <body className="h-screen">
        <Providers>
          <AddVisitCount>
            <Header />
            {authModal}
            <Toaster />
            <section className="flex h-[75vh] min-h-fit flex-col items-center justify-center px-5">
              {children}
            </section>
          </AddVisitCount>
        </Providers>
      </body>
    </html>
  );
}
