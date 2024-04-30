"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { showToastMessage } from "@/utils";
import type { Teensy, Visit } from "@/server/schema";
import { BiPencil } from "react-icons/bi";
import { BsQrCode } from "react-icons/bs";

import { trpc } from "@/app/_trpc/client";
import { env } from "@/env.mjs";
import copy from "copy-to-clipboard";
import { useQRCode } from "next-qrcode";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import TeensyForm from "../TeensyForm";
import { buttonVariants } from "../ui/button";

type TeensyRowProps = {
  teensy: Teensy & { visits: Visit[] };
  ownerId: string;
};

const TeensyRow = ({ teensy, ownerId }: TeensyRowProps) => {
  const { Canvas } = useQRCode();
  const router = useRouter();
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteTeensy = trpc.deleteSlug.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  function handleDeleteClick(id: number) {
    deleteTeensy.mutate({ id });
  }

  function downloadQRCode(slug: string) {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `qrcode-${slug}.png`;
    link.href = image;
    link.click();
  }

  return (
    <tr
      className="border-b bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900  dark:hover:bg-zinc-800/80"
      key={teensy.id}
    >
      <td className="flex justify-center gap-x-4 p-4">
        <Dialog open={showQRCodeModal} onOpenChange={setShowQRCodeModal}>
          <DialogTrigger>
            <BsQrCode className="ml-1 inline-block text-lg text-black hover:underline dark:text-zinc-200" />
          </DialogTrigger>
          <DialogContent className="text-black dark:text-white">
            <DialogHeader>
              <DialogTitle>QR Code</DialogTitle>
              <DialogDescription>
                <div className="flex flex-col items-center justify-center px-4 pt-8">
                  <Canvas
                    text={`${env.NEXT_PUBLIC_SITE_URL}/${teensy.slug}`}
                    logo={{
                      src: "/icon-192x192.png",
                      options: { width: 45 },
                    }}
                    options={{
                      errorCorrectionLevel: "M",
                      margin: 1,
                      scale: 5,
                      width: 200,
                      color: {
                        dark: "#000",
                        light: "#fff",
                      },
                    }}
                  />
                  <p className="mt-4 flex gap-1">
                    <span>QR Code for</span>
                    <span
                      className="cursor-pointer text-purple-600 hover:underline dark:text-primary"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          copy(`${env.NEXT_PUBLIC_SITE_URL}/${teensy.slug}`);
                          showToastMessage("Link Copied!");
                        }
                      }}
                      onClick={() => {
                        copy(`${env.NEXT_PUBLIC_SITE_URL}/${teensy.slug}`);
                        showToastMessage("Link Copied!");
                      }}
                    >
                      {`${env.NEXT_PUBLIC_SITE_URL.replaceAll(
                        /https?:\/\//gi,
                        "",
                      )}/${teensy.slug}`}
                    </span>
                  </p>
                  <Button onClick={() => downloadQRCode(teensy.slug)}>
                    Download PNG
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
          <DialogTrigger>
            <BiPencil className="ml-1 inline-block text-lg text-purple-600 hover:underline dark:text-primary" />
          </DialogTrigger>
          <DialogContent className="text-black dark:text-white">
            <DialogHeader>
              <DialogTitle>Edit Teensy</DialogTitle>
            </DialogHeader>
            <TeensyForm
              ownerId={ownerId}
              mode="edit"
              currentTeensy={teensy}
              onClose={() => setShowEditModal(false)}
            />
          </DialogContent>
        </Dialog>
        <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <AlertDialogTrigger>
            <MdOutlineDelete className="ml-1 inline-block text-lg text-red-500 hover:underline dark:text-red-450" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-black dark:text-white">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                teensy.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-black dark:text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className={buttonVariants()}
                onClick={() => handleDeleteClick(teensy.id)}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </td>
      <td
        className="cursor-pointer p-4 font-medium text-zinc-900 hover:underline dark:text-white "
        onClick={() => {
          copy(`${env.NEXT_PUBLIC_SITE_URL}/${teensy.slug}`);
          showToastMessage("Link Copied!");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            copy(`${env.NEXT_PUBLIC_SITE_URL}/${teensy.slug}`);
            showToastMessage("Link Copied!");
          }
        }}
      >
        /{teensy.slug}
      </td>
      <td className="p-4">{teensy.visits.length}</td>
      <td className="p-4">
        <a
          href={teensy.url}
          target="_blank"
          rel="noreferrer"
          title={teensy.url}
          className="line-clamp-1 max-w-[50ch] hover:underline md:max-w-[60ch] lg:max-w-[70ch]"
        >
          {teensy.url}
        </a>
      </td>
    </tr>
  );
};

export default TeensyRow;
