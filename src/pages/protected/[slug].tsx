import Button from "$components/Button";
import Input from "$components/Input";
import { api } from "$utils/api";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const ProtectedTeensyPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const currentTeensy = api.fetchUserTeensy.useQuery(
    router.query.slug as string,
  );

  if (!currentTeensy.data || currentTeensy.isLoading || currentTeensy.isError) {
    return <p>Loading...</p>;
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentTeensy.data.password === password) {
      void router.push(currentTeensy.data.url);
    }
  };

  return (
    <>
      <Head>
        <title>Protected Teensy</title>
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
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-center text-2xl sm:text-xl">
          This link is protected
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <Input
            label="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            minLength={5}
          />
          <Button title="Submit" disabled={password.length < 5} type="submit" />
        </form>
      </div>
    </>
  );
};

export default ProtectedTeensyPage;
