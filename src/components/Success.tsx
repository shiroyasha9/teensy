"use client";

import { env } from "@/env.mjs";
import { formAtom } from "@/store";
import { showToastMessage } from "@/utils";
import copy from "copy-to-clipboard";
import { useAtom } from "jotai";
import { useQRCode } from "next-qrcode";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import Button from "./Button";

const Success = () => {
  const [{ slug }, setForm] = useAtom(formAtom);
  const { Canvas } = useQRCode();
  const [showDownloadQRButton, setShowDownloadQRButton] = useState(false);
  const router = useRouter();

  const resetHandler = () => {
    setForm({
      slug: "",
      url: "",
      isPasswordProtected: false,
      password: undefined,
      isAutoDelete: false,
      expiresAt: undefined,
    });
    router.push("/");
  };

  function downloadQRCode() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `qrcode-${slug}.png`;
    link.href = image;
    link.click();
  }

  return (
    <>
      <div
        className="mt-3 flex items-center justify-center"
        onMouseOver={() => setShowDownloadQRButton(true)}
        onMouseOut={() => setShowDownloadQRButton(false)}
      >
        <Canvas
          text={`${env.NEXT_PUBLIC_SITE_URL}/${slug}`}
          logo={{ src: "/icon-192x192.png", options: { width: 45 } }}
          options={{
            errorCorrectionLevel: "M",
            margin: 1,
            scale: 5,
            width: 150,
            color: {
              dark: "#000",
              light: "#fff",
            },
          }}
        />
        <div
          className={`grid h-[150px] w-[150px] cursor-pointer place-items-center backdrop-blur-sm dark:bg-black/50 ${
            showDownloadQRButton ? "absolute" : "hidden"
          }`}
        >
          <AiOutlineCloudDownload
            onClick={downloadQRCode}
            className="h-10 w-10"
          />
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Button
          title="Copy Teensy"
          className="mt-5 px-3 py-1.5 text-base"
          onClick={() => {
            copy(`${env.NEXT_PUBLIC_SITE_URL}/${slug}`);
            showToastMessage("Link Copied!");
          }}
        />
        <Button
          title="Back to Home"
          variant="secondary"
          onClick={resetHandler}
          className="mt-5 px-3 py-1.5 text-base"
        />
      </div>
    </>
  );
};

export default Success;
