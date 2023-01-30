import DeleteLink from "$components/DeleteLink";
import EditLink from "$components/EditLink";
import Input from "$components/Input";
import Modal from "$components/Modal";
import { showAuthModalAtom } from "$store";
import { api } from "$utils/api";

import type { Teensy } from "@prisma/client";
import { useSetAtom } from "jotai";
import debounce from "lodash.debounce";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { MdSearch } from "react-icons/md";

export default function TeensiesPage() {
  const setShowAuthModal = useSetAtom(showAuthModalAtom);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTeensy, setCurrentTeensy] = useState<Teensy | null>(null);
  const [search, setSearch] = useState("");
  const userTeensies = api.fetchUserSlugs.useQuery();

  function handleEditClick(teensy: Teensy) {
    setCurrentTeensy(teensy);
    setShowEditModal(true);
  }

  function handleDeleteClick(teensy: Teensy) {
    setCurrentTeensy(teensy);
    setShowDeleteModal(true);
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
        <h1 className="text-center text-2xl sm:text-xl">My Teensies</h1>
        <div className="my-4 w-[90vw] sm:w-[60vw]">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative mx-[2px] mt-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MdSearch className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            <Input
              type="text"
              className="my-0 block w-full rounded-lg border !p-2 py-0 px-3 !pl-10 text-sm"
              placeholder="Search for items"
              noContainer
              defaultValue=""
              onChange={debouncedSearchChangeHandler}
            />
          </div>
        </div>
        <div className="relative w-[90vw] overflow-x-auto sm:w-[60vw] sm:rounded-lg ">
          <div className="table-wrp block h-64 max-h-64 rounded-md">
            <table className="w-full rounded-md text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="sticky top-0 z-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="w-[10vw] px-6 py-3">
                    Teensy Slug
                  </th>
                  <th scope="col" className="w-[60vw] px-6 py-3 sm:w-[30vw]">
                    Full URL
                  </th>
                  <th scope="col" className="w-[10vw] px-6 py-3">
                    Visits
                  </th>
                  <th
                    scope="col"
                    className="w-[10vw] px-6 py-3 text-center"
                    colSpan={2}
                  >
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
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        <Link href={`/${teensy.slug}`}>/{teensy.slug}</Link>
                      </th>
                      <td className="px-6 py-4">
                        <a
                          href={teensy.url}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {teensy.url}
                        </a>
                      </td>
                      <td className="px-6 py-4">{teensy.visits.length}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleEditClick(teensy)}
                          className="font-medium text-purple-600 hover:underline dark:text-lemon-400"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="px-6 py-4">
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
