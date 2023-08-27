"use client";
import { formAtom, isSuccessfulAtom, teensyUrlAtom } from "@/store";
import { showToastMessage } from "@/utils/functions";
import copy from "copy-to-clipboard";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useQRCode } from "next-qrcode";
import { useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import Button from "./Button";

const Success = () => {
  const [{ slug }, setForm] = useAtom(formAtom);
  const teensyUrl = useAtomValue(teensyUrlAtom);
  const { Canvas } = useQRCode();
  const setIsSuccessful = useSetAtom(isSuccessfulAtom);
  const [showDownloadQRButton, setShowDownloadQRButton] = useState(false);

  const resetHandler = () => {
    setForm({
      slug: "",
      url: "",
      isPasswordProtected: false,
      password: undefined,
      isAutoDelete: false,
      expiresAt: undefined,
    });
    setIsSuccessful(false);
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
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center  justify-center">
        <h3 className="mb-3 text-xl">
          Successful! 🥳 Here&apos;s your teensy:{" "}
        </h3>
        <a
          href={`/${slug}`}
          className="mt-1 rounded-2xl bg-gray-200/30 px-3 py-1"
        >
          <h1>{`${teensyUrl}/${slug}`}</h1>
        </a>
      </div>
      <div
        className="mt-3 flex items-center justify-center"
        onMouseOver={() => setShowDownloadQRButton(true)}
        onMouseOut={() => setShowDownloadQRButton(false)}
      >
        <Canvas
          text={`${teensyUrl}/${slug}`}
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
          className={`grid h-[150px] w-[150px] cursor-pointer place-items-center backdrop-blur-sm dark:bg-black/50 ${showDownloadQRButton ? "absolute" : "hidden"
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
            copy(`${window.location.protocol}//${teensyUrl}/${slug}`);
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
    </div>
  );
};

export default Success;
