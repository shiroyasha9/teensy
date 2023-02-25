import AuthModal from "$components/AuthModal";
import Footer from "$components/Footer";
import Header from "$components/Header";
import "$styles/globals.css";
import { api } from "$utils/api";
import { isDevEnvironment } from "$utils/functions";

import { Rubik } from "@next/font/google";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { type AppType } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export const rubik = Rubik({
  subsets: ["latin"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const addGlobalVisitCount = api.addGlobalVisit.useMutation();

  useEffect(() => {
    if (window.sessionStorage && !isDevEnvironment) {
      const isVisited = sessionStorage.getItem("isVisited");
      if (!isVisited) {
        addGlobalVisitCount.mutate();
        sessionStorage.setItem("isVisited", "true");
      }
    }
  }, []);

  let content: React.ReactNode;
  if (router.pathname === "/swagger") {
    content = <Component {...pageProps} />;
  } else {
    content = (
      <main className="h-screen">
        <Header />
        <section className="flex h-[75vh] min-h-fit flex-col items-center justify-center px-5">
          <Component {...pageProps} />
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <SessionProvider session={session}>
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
      `}</style>
      <ThemeProvider enableSystem={true} attribute="class">
        <Toaster />
        {content}
        <AuthModal />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
