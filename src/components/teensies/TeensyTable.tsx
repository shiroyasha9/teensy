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
import { Input } from "@/components/ui/input";
import { showToastMessage } from "@/utils";
import { BiPencil } from "react-icons/bi";
import { BsQrCode } from "react-icons/bs";

import { trpc } from "@/app/_trpc/client";
import { env } from "@/env.mjs";
import type { Teensy, Visit } from "@prisma/client";
import copy from "copy-to-clipboard";
import debounce from "lodash.debounce";
import { useQRCode } from "next-qrcode";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { MdOutlineDelete, MdSearch } from "react-icons/md";
import TeensyForm from "../TeensyForm";
import { buttonVariants } from "../ui/button";

type TeensyTableProps = {
  userTeensies: (Teensy & { visits: Visit[] })[];
  ownerId: string;
};

const TeensyTable = ({ userTeensies, ownerId }: TeensyTableProps) => {
  const router = useRouter();
  const editModalRef = useRef<HTMLButtonElement>(null);
  const [search, setSearch] = useState("");
  const { Canvas } = useQRCode();

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

  const filteredData = useMemo(() => {
    if (userTeensies) {
      if (search !== "") {
        return userTeensies.filter(
          (teensy) =>
            teensy.slug.toLowerCase().includes(search.toLowerCase()) ||
            teensy.url.toLowerCase().includes(search.toLowerCase()),
        );
      } else {
        return userTeensies;
      }
    }
  }, [userTeensies, search]);

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  const debouncedSearchChangeHandler = useMemo(() => {
    return debounce(handleSearchChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearchChangeHandler.cancel();
    };
  });

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="my-4 w-[90vw] sm:w-[85vw]">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mx-[2px] mt-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MdSearch className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
          </div>
          <Input
            type="text"
            className="my-0 block w-full rounded-lg border !p-2 px-3 py-0 !pl-10 text-sm"
            placeholder="Search for any url or slug..."
            noContainer
            defaultValue=""
            onChange={debouncedSearchChangeHandler}
          />
        </div>
      </div>
      <div className="relative w-[90vw] overflow-x-auto sm:w-[85vw] sm:rounded-lg ">
        <div className="block h-64 max-h-64 rounded-md">
          <table className="w-full rounded-md text-left text-sm text-zinc-500 dark:text-zinc-400">
            <thead className="sticky top-0 z-0 bg-zinc-200 text-xs uppercase text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              <tr>
                <th scope="col" className="px-4 py-3 text-center">
                  Actions
                </th>
                <th scope="col" className="px-4 py-3">
                  Teensy Slug
                </th>
                <th scope="col" className="px-4 py-3">
                  Visits
                </th>
                <th scope="col" className="px-4 py-3 ">
                  Full URL
                </th>
              </tr>
            </thead>
            <tbody className="max-h-64 overflow-y-auto">
              {filteredData &&
                filteredData.map((teensy) => (
                  <tr
                    className="border-b bg-zinc-50 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900  dark:hover:bg-zinc-800/80"
                    key={teensy.id}
                  >
                    <td className="flex justify-center gap-x-4 p-4">
                      <Dialog>
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
                                    onClick={() => {
                                      copy(
                                        `${env.NEXT_PUBLIC_SITE_URL}/${teensy.slug}`,
                                      );
                                      showToastMessage("Link Copied!");
                                    }}
                                  >
                                    {`${env.NEXT_PUBLIC_SITE_URL.replaceAll(
                                      /https?:\/\//gi,
                                      "",
                                    )}/${teensy.slug}`}
                                  </span>
                                </p>
                                <Button
                                  onClick={() => downloadQRCode(teensy.slug)}
                                >
                                  Download PNG
                                </Button>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger ref={editModalRef}>
                          <BiPencil className="ml-1 inline-block text-lg text-purple-600 hover:underline dark:text-primary" />
                        </DialogTrigger>
                        <DialogContent className="text-black dark:text-white">
                          <DialogHeader>
                            <DialogTitle>Edit Teensy</DialogTitle>
                          </DialogHeader>
                          <TeensyForm
                            onClose={() => editModalRef.current?.click()}
                            ownerId={ownerId}
                            mode="edit"
                            currentTeensy={teensy}
                          />
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <MdOutlineDelete className="ml-1 inline-block text-lg text-red-500 hover:underline dark:text-red-450" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-black dark:text-white">
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete this teensy.
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
                      scope="row"
                      className="cursor-pointer p-4 font-medium text-zinc-900 hover:underline dark:text-white "
                      onClick={() => {
                        copy(`${env.NEXT_PUBLIC_SITE_URL}/${teensy.slug}`);
                        showToastMessage("Link Copied!");
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
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeensyTable;
