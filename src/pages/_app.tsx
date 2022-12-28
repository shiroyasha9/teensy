import { Rubik } from "@next/font/google";
import type { AppType } from "next/app";
import Footer from "../components/Footer";
import Header from "../components/Header";

import "../styles/globals.css";

import { trpc } from "../utils/trpc";

export const rubik = Rubik({
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
      `}</style>
      <main className="h-screen">
        <Header />
        <section className="flex h-[65vh] flex-col items-center justify-center px-5 md:h-[70vh]">
          <Component {...pageProps} />
        </section>
        <Footer />
      </main>
    </>
  );
};

export default trpc.withTRPC(MyApp);
