import { Teensy } from "@prisma/client";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin7Line } from "react-icons/ri";
import DeleteLink from "../components/DeleteLink";
import EditLink from "../components/EditLink";
import Modal from "../components/Modal";
import { showAuthModalAtom } from "../stores";
import { trpc } from "../utils/trpc";

export default function TeeniesPage() {
  const { data: session, status } = useSession();
  const setShowAuthModal = useSetAtom(showAuthModalAtom);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentTeensy, setCurrentTeensy] = useState<Teensy | null>(null);
  const userTeensies = trpc.fetchUserSlugs.useQuery({
    email: session?.user?.email || "",
  });

  function handleEditClick(teensy: Teensy) {
    setCurrentTeensy(teensy);
    setShowEditModal(true);
  }

  function handleDeleteClick(teensy: Teensy) {
    setCurrentTeensy(teensy);
    setShowDeleteModal(true);
  }

  if (status === "loading" || !userTeensies.data) {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    setShowAuthModal(true);
    return <p>You need to be logged in to see and modify your teenies.</p>;
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
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="text-center text-2xl sm:text-xl">My Teensies</h1>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Slug</th>
              <th className="px-4 py-2">URL</th>
            </tr>
          </thead>
          <tbody>
            {userTeensies.data.teensies.map((teensy) => (
              <tr key={teensy.slug}>
                <td className="border px-4 py-2 text-lemon-400">
                  <Link href={`/${teensy.slug}`}>{teensy.slug}</Link>
                </td>

                <td className="border px-4 py-2">
                  <a href={teensy.url} target="_blank" rel="noreferrer">
                    {teensy.url}
                  </a>
                </td>
                <td>
                  <FiEdit2
                    className="mx-2 cursor-pointer hover:text-lemon-400"
                    onClick={() => handleEditClick(teensy)}
                  />
                </td>
                <td>
                  <RiDeleteBin7Line
                    className="cursor-pointer hover:text-lemon-400"
                    onClick={() => handleDeleteClick(teensy)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          showModal={showEditModal}
          closeModal={() => setShowEditModal(false)}
        >
          <EditLink
            onClose={() => {
              setShowEditModal(false);
              userTeensies.refetch();
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
              userTeensies.refetch();
            }}
            currentTeensy={currentTeensy!}
          />
        </Modal>
      </div>
    </>
  );
}
