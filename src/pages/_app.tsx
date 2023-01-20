import { Rubik } from "@next/font/google";
import type { AppType } from "next/app";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { trpc } from "../utils/trpc";

export const rubik = Rubik({
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
      `}</style>
      <Toaster />
      <main className="h-screen">
        <Header />
        <section className="flex h-[65vh] flex-col items-center justify-center px-5 md:h-[70vh]">
          <Component {...pageProps} />
        </section>
        <Footer />
      </main>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
