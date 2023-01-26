import CreateLinkForm from "$components/CreateLink";
import { isSuccessfulAtom } from "$store";
import { useAtomValue } from "jotai";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Confetti from "react-dom-confetti";

const Success = dynamic(() => import("$components/Success"), {
  ssr: true,
  loading: () => <p>Loading... ⏳</p>,
});

const config = {
  angle: 90,
  spread: 176,
  startVelocity: 30,
  elementCount: 133,
  dragFriction: 0.07,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const Home: NextPage = () => {
  const isSuccessful = useAtomValue(isSuccessfulAtom);

  return (
    <>
      <Head>
        <title>Teensy your URLs</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#712fb9" />
        <meta property="og:url" content={"https://teensy.tech"} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Teensy your long boring URLs" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="A Customizable URL shortener. Paste URL, give it a name, done!"
        />
        <meta property="og:image" content={"https://teensy.tech/teensy.png"} />
        <meta
          name="description"
          content="Teensy is a Customizable URL shortener. Paste URL, give it a name, done!"
        />
      </Head>
      <>
        <Confetti active={isSuccessful} config={config} />
        {isSuccessful ? <Success /> : <CreateLinkForm />}
      </>
    </>
  );
};

export default Home;
