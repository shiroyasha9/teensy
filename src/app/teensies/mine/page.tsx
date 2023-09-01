"use client";
import Button from "@/components/Button";
import DeleteLink from "@/components/DeleteLink";
import EditLink from "@/components/EditLink";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { showAuthModalAtom } from "@/store";
import { showToastMessage } from "@/utils";

import { env } from "@/env.mjs";
import type { Teensy } from "@prisma/client";
import copy from "copy-to-clipboard";
import { useSetAtom } from "jotai";
import debounce from "lodash.debounce";
import { useQRCode } from "next-qrcode";
import { useTheme } from "next-themes";
import Head from "next/head";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { MdSearch } from "react-icons/md";
import { trpc } from "../../_trpc/client";

export default function TeensiesPage() {
  const setShowAuthModal = useSetAtom(showAuthModalAtom);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentTeensy, setCurrentTeensy] = useState<Teensy | null>(null);
  const [search, setSearch] = useState("");
  const userTeensies = trpc.fetchUserSlugs.useQuery();
  const { theme } = useTheme();
  const { Canvas } = useQRCode();

  function handleQRClick(teensy: Teensy) {
    setCurrentTeensy(teensy);
    setShowQRModal(true);
  }

  function handleEditClick(teensy: Teensy) {
    setCurrentTeensy(teensy);
    setShowEditModal(true);
  }

  function handleDeleteClick(teensy: Teensy) {
    setCurrentTeensy(teensy);
    setShowDeleteModal(true);
  }

  function downloadQRCode() {
    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `qrcode-${currentTeensy?.slug ?? ""}.png`;
    link.href = image;
    link.click();
  }

  const filteredData = useMemo(() => {
    if (userTeensies.data?.teensies) {
      if (search !== "") {
        return userTeensies.data.teensies.filter(
          (teensy) =>
            teensy.slug.toLowerCase().includes(search.toLowerCase()) ||
            teensy.url.toLowerCase().includes(search.toLowerCase()),
        );
      } else {
        return userTeensies.data.teensies;
      }
    }
  }, [userTeensies.data, search]);

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

  if (userTeensies.isLoading) {
    return <p>Loading...</p>;
  }

  if (userTeensies.isError || !userTeensies.data) {
    if (userTeensies.error.data?.httpStatus === 401) {
      setShowAuthModal(true);
      return <p>You need to be logged in to see and modify your teensies.</p>;
    }
    return <p>Something went wrong. Please refresh the page.</p>;
  }

  return (
    <>
      <Head>
        <title>My Teensies</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💾</text></svg>"
        />
        <meta property="og:url" content={"https://teensy.tech/teensies"} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Saved Teensies" />
        <meta name="twitter:card" content="summary" />
        <meta
          property="og:description"
          content="Save your teensies to edit/delete them later!"
        />
        <meta
          property="og:image"
          content={"https://teensy.tech/my-teensy-links.png"}
        />
        <meta name="description" content="Edit/Delete your saved teensies." />
      </Head>

      <div className="flex flex-col items-center justify-center gap-3">
        <>
          <h1 className="text-center text-2xl sm:text-xl">My Teensies</h1>
          <div className="my-4 w-[90vw] sm:w-[85vw]">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mx-[2px] mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MdSearch className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <Input
                type="text"
                className="my-0 block w-full rounded-lg border !p-2 px-3 py-0 !pl-10 text-sm"
                placeholder="Search for items"
                noContainer
                defaultValue=""
                onChange={debouncedSearchChangeHandler}
              />
            </div>
          </div>
          <div className="relative w-[90vw] overflow-x-auto sm:w-[85vw] sm:rounded-lg ">
            <div className="table-wrp block h-64 max-h-64 rounded-md">
              <table className="w-full rounded-md text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="sticky top-0 z-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="w-[10vw] px-6 py-3">
                      Teensy Slug
                    </th>
                    <th scope="col" className="w-[30vw] px-6 py-3 sm:w-[30vw]">
                      Full URL
                    </th>
                    <th scope="col" className="w-[10vw] px-6 py-3">
                      Visits
                    </th>
                    <th scope="col" className="w-[10vw] px-6 py-3 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="max-h-64 overflow-y-auto">
                  {filteredData &&
                    filteredData.map((teensy) => (
                      <tr
                        className="border-b bg-gray-100 hover:bg-gray-200 dark:border-gray-700 dark:bg-[#37415180] dark:hover:bg-gray-700/75"
                        key={teensy.id}
                      >
                        <td
                          scope="row"
                          className="cursor-pointer whitespace-nowrap px-6 py-4 font-medium text-gray-900 hover:underline dark:text-white "
                          onClick={() => {
                            copy(`${env.NEXT_PUBLIC_SITE_URL}/${teensy.slug}`);
                            showToastMessage("Link Copied!");
                          }}
                        >
                          /{teensy.slug}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={teensy.url}
                            target="_blank"
                            rel="noreferrer"
                            className="line-clamp-1 hover:underline"
                          >
                            {teensy.url}
                          </a>
                        </td>
                        <td className="px-6 py-4">{teensy.visits.length}</td>

                        <td className="flex justify-center gap-8 px-6 py-4">
                          <button
                            onClick={() => handleQRClick(teensy)}
                            className="font-medium text-black hover:underline dark:text-gray-200"
                          >
                            QR
                          </button>
                          <button
                            onClick={() => handleEditClick(teensy)}
                            className="font-medium text-purple-600 hover:underline dark:text-lemon-400"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(teensy)}
                            className="font-medium text-red-500 hover:underline dark:text-red-450"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
        <Modal showModal={showQRModal} closeModal={() => setShowQRModal(false)}>
          <div className="flex flex-col items-center justify-center px-4 pt-8">
            <Canvas
              text={`${env.NEXT_PUBLIC_SITE_URL}/${currentTeensy?.slug || ""}`}
              logo={{ src: "/icon-192x192.png", options: { width: 45 } }}
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
                className="cursor-pointer text-purple-600 hover:underline dark:text-lemon-400"
                onClick={() => {
                  copy(
                    `${env.NEXT_PUBLIC_SITE_URL}/${currentTeensy?.slug || ""}`,
                  );
                  showToastMessage("Link Copied!");
                }}
              >
                {`${env.NEXT_PUBLIC_SITE_URL.replaceAll(/https?:\/\//gi, "")}/${
                  currentTeensy?.slug || ""
                }`}
              </span>
            </p>
            <Button
              title="Download PNG"
              onClick={downloadQRCode}
              variant={theme === "dark" ? "primary" : "tertiary"}
            />
          </div>
        </Modal>
        <Modal
          showModal={showEditModal}
          closeModal={() => setShowEditModal(false)}
        >
          <EditLink
            onClose={() => {
              setShowEditModal(false);
              void userTeensies.refetch();
            }}
            currentTeensy={currentTeensy!}
          />
        </Modal>
        <Modal
          showModal={showDeleteModal}
          closeModal={() => setShowDeleteModal(false)}
        >
          <DeleteLink
            onClose={() => {
              setShowDeleteModal(false);
              void userTeensies.refetch();
            }}
            currentTeensy={currentTeensy!}
          />
        </Modal>
      </div>
    </>
  );
}
