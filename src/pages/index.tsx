import { useAtomValue } from "jotai";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Footer from "../components/Footer";
import { isSuccessfulAtom } from "../stores";

const CreateLinkForm = dynamic(() => import("../components/CreateLink"), {
  ssr: true,
  loading: () => <p>Loading... ⏳</p>,
});
const Success = dynamic(() => import("../components/Success"), {
  ssr: true,
  loading: () => <p>Loading... ⏳</p>,
});

const Home: NextPage = () => {
  const isSuccessful = useAtomValue(isSuccessfulAtom);

  return (
    <>
      <Head>
        <title>Teeny your URLs</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#712fb9" />
        <meta property="og:url" content={"https://teeny.tk"} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Teeny your long boring URLs" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="A Customizable URL shortener. Paste URL, give it a name, done!"
        />
        <meta property="og:image" content={"https://teeny.tk/teeny.png"} />
        <meta
          name="description"
          content="Teeny is a Customizable URL shortener. Paste URL, give it a name, done!"
        />
      </Head>
      <div className="flex h-screen flex-col items-center justify-center ">
        {isSuccessful ? <Success /> : <CreateLinkForm />}

        <Footer />
      </div>
    </>
  );
};

export default Home;
