import AddVisitCount from "@/components/layout/AddVisitCount";
import Providers from "@/components/layout/Providers";
import { Toaster as ShadcnToast } from "@/components/ui/toaster";
import { cn } from "@/utils";
import { Analytics } from "@vercel/analytics/react";
import { Rubik } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Confetti from "@/components/layout/Confetti";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import VersionModal from "@/components/version/VersionModal";
import "@/styles/globals.css";
import { Suspense } from "react";

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
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </AddVisitCount>
          <Confetti />
          <VersionModal />
          <ShadcnToast />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
