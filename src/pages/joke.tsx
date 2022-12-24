import { trpc } from "../../utils/trpc";
import Footer from "../components/Footer";
import Head from "next/head";

const JokePage = () => {
  const { data } = trpc.useQuery(["getJoke"]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 bg-gray-800 px-4 text-gray-50">
      <Head>
        <title>Joke</title>
        <meta property="og:url" content={"https://smallify.live/joke"} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Jokes to make your day" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="Feeling down? Here's a joke to cheer you up!"
        />
        <meta property="og:image" content={"https://smallify.tech/joke.png"} />
        <meta
          name="description"
          content="Feeling down? Here's a joke to cheer you up!"
        />
      </Head>
      <h1 className="mb-5 flex cursor-default justify-center text-5xl">
        smallify
      </h1>
      {!data ? (
        <h1 className="text-2xl sm:text-xl">Loading</h1>
      ) : (
        <>
          <h1 className="text-2xl sm:text-xl">
            {data.type === "single" ? data.joke : data.setup}
          </h1>
          {data.type === "twopart" && (
            <h1 className="text-2xl sm:text-xl">{data.delivery}</h1>
          )}
        </>
      )}
      <Footer />
    </div>
  );
};

export default JokePage;
