import WhatsAppForm from "@/components/WhatsAppForm";
import Head from "next/head";

export const metadata = {
  title: "WhatsApp without saving number!",
  description: "No more saving unwanted contacts!",
};

export default function WhatsAppPage() {
  return (
    <>
      <Head>
        <title>Contactless Whatsapp</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💬</text></svg>"
        />
        <meta property="og:url" content={"https://teensy.tech/wa"} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="WhatsApp without saving number!" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="No more saving unwanted contacts!"
        />
        <meta property="og:image" content={"https://teensy.tech/wa.png"} />
        <meta
          name="description"
          content="WhatsApp without saving their number!"
        />
      </Head>
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-center text-2xl sm:text-xl">
          Want to WhatsApp someone without saving their number?
        </h1>
        <WhatsAppForm />
        <p className="text-center">
          <span>you will be redirected to a page, click on</span>{" "}
          <span className="text-lemon-400">Continue to chat</span>
        </p>
      </div>
    </>
  );
}
