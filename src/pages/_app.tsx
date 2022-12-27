import { Rubik } from "@next/font/google";
import type { AppType } from "next/app";

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
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
