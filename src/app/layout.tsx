import AddVisitCount from "@/components/AddVisitCount";
import Providers from "@/components/Providers";
import { cn } from "@/utils/functions";
import { Rubik } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Confetti from "@/components/layout/Confetti";

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
      <body className="flex h-screen flex-col p-6">
        <Providers>
          <AddVisitCount>
            <Header />
            {authModal}
            <Toaster />
            <section className="flex flex-1 flex-col items-center justify-center pt-12">
              {children}
            </section>
            <Footer />
          </AddVisitCount>
          <Confetti />
        </Providers>
      </body>
    </html>
  );
}
