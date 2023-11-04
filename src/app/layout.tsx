import AddVisitCount from "@/components/layout/AddVisitCount";
import Providers from "@/components/layout/Providers";
import { cn } from "@/utils";
import { Rubik } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Toaster as ShadcnToast } from "@/components/ui/toaster";

import "@/styles/globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Confetti from "@/components/layout/Confetti";
import VersionModal from "@/components/version/VersionModal";

export const metadata = {
  title: "Teensy your URLs",
  description: "A Customizable URL shortener. Paste URL, give it a name, done!",
};

const rubik = Rubik({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("antialiased", rubik.className)}>
      <body className="flex h-screen flex-col p-6 md:overflow-x-hidden">
        <Providers>
          <AddVisitCount>
            <Header />
            {authModal}
            <Toaster />
            <section className="mt-12 flex flex-1 flex-col items-center justify-center">
              {children}
            </section>
            <Footer />
          </AddVisitCount>
          <Confetti />
          <VersionModal />
          <ShadcnToast />
        </Providers>
      </body>
    </html>
  );
}
