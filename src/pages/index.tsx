import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

const CreateLinkForm = dynamic(() => import("../components/CreateLink"), {
  ssr: true,
});
const Footer = dynamic(() => import("../components/Footer"), {
  ssr: true,
});

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Smallify your URLs</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#07779C" />
        <meta property="og:url" content={"https://smallify.live"} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Smallify your long boring URLs" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="A Customizable URL shortener. Paste URL, give it a name, done!"
        />
        <meta
          property="og:image"
          content={"https://smallify.tech/smallify.png"}
        />
        <meta
          name="description"
          content="Smallify is a Customizable URL shortener. Paste URL, give it a name, done!"
        />
      </Head>
      <div className="flex h-screen flex-col items-center justify-center bg-gray-800 text-gray-50">
        <CreateLinkForm />
        <Footer />
      </div>
    </>
  );
};

export default Home;
