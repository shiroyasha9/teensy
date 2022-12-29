import Head from "next/head";
import Router from "next/router";
import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";

export default function WhatsAppPage() {
  const [phoneNumber, setPhoneNumber] = useState("");

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let sanitizedPhoneNumber = phoneNumber
              .replaceAll("-", "")
              .replaceAll(" ", "")
              .replaceAll("+", "")
              .replace(/\D/g, "");
            console.log(sanitizedPhoneNumber);
            Router.push(`/wa/${sanitizedPhoneNumber}`);
          }}
          className="flex flex-col gap-3"
        >
          <div className="flex items-center gap-1">
            <span className="mr-2 whitespace-nowrap font-medium">
              Enter their number here:
            </span>
            <Input
              required
              type="number"
              placeholder="+1 999 999 9999"
              minLength={7}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            title="WhatsApp them!"
            className="mx-0"
            disabled={phoneNumber.length < 8}
          />
        </form>
        <p className="text-center">
          <span>you will be redirected to a page, click on</span>{" "}
          <span className="text-lemon-400">Continue to chat</span>
        </p>
      </div>
    </>
  );
}
