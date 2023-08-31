"use client";

import { multipleFormAtom } from "@/store";
import { nanoidForSlug, showErrorMessage, showToastMessage } from "@/utils";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { flushSync } from "react-dom";
import { MdBlock } from "react-icons/md";
import { trpc } from "../_trpc/client";

const Multiple = () => {
  const router = useRouter();
  const [showErrors, setShowErrors] = useState(false);
  const [multipleTeensiesData, setMultipleTeensiesData] =
    useAtom(multipleFormAtom);
  const addTeensy = () => {
    setMultipleTeensiesData([
      ...multipleTeensiesData,
      { slug: "", url: "", used: false, isPasswordProtected: false },
    ]);
  };
  const { mutateAsync: checkSlugs } = trpc.slugCheckMultiple.useMutation();
  const { mutateAsync: createMultipleTeensies } =
    trpc.createMultipleTeensies.useMutation();

  const handleSubmitCreateTeensies = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = await checkSlugs(multipleTeensiesData);
    console.log({ multipleTeensiesData, data });
    flushSync(() => {
      setMultipleTeensiesData(
        multipleTeensiesData.map((teensy) => {
          if (data?.usedSlugs?.includes(teensy.slug)) {
            return { ...teensy, used: true };
          } else return { ...teensy, used: false };
        }),
      );
    });
    if (data && data.usedSlugs?.length > 0) {
      setShowErrors(true);

      showErrorMessage("Some of the aliases are already taken");
      return;
    } else {
      setShowErrors(false);
      const data = await createMultipleTeensies(multipleTeensiesData);
      console.log({ data: data.success });
      if (data.success) {
        setMultipleTeensiesData([
          { slug: "", url: "", used: false, isPasswordProtected: false },
        ]);
        showToastMessage("Teensies created successfully");
        void router.push("/");
      }
    }

    console.log({ multipleTeensiesData });
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>Create multiple teensies at once</div>
      <form
        onSubmit={(e: React.SyntheticEvent) =>
          void handleSubmitCreateTeensies(e)
        }
      >
        <div className="relative w-[90vw] overflow-x-auto sm:w-[85vw] sm:rounded-lg ">
          <div className="table-wrp block h-64 max-h-64 rounded-md">
            <table className="w-full rounded-md text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="sticky top-0 z-0 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className=" px-6 py-3 sm:w-[30vw]">
                    Full URL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Teensy Slug
                  </th>

                  <th scope="col" className="px-6 py-3 text-center">
                    {/* Actions */}
                  </th>
                </tr>
              </thead>
              <tbody className="max-h-64 overflow-y-auto">
                {multipleTeensiesData.map((teensy, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-600"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="url"
                        required
                        className="my-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-black placeholder-slate-400 shadow-sm focus:border-lemon-400 focus:outline-none focus:ring-2 focus:ring-lemon-400 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-200 sm:px-2 sm:text-sm "
                        placeholder="https://example.com"
                        value={teensy.url}
                        onChange={(e) => {
                          const newTeensies = [...multipleTeensiesData];
                          newTeensies[index]!.url = e.target.value;
                          flushSync(() => {
                            setMultipleTeensiesData(newTeensies);
                          });
                        }}
                      />
                    </td>
                    <td className="px-6 py-4">
                      {showErrors && teensy.used && (
                        <p className="text-xs italic text-red-500">
                          This alias is already taken
                        </p>
                      )}
                      <input
                        type="text"
                        required
                        className={`my-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-black placeholder-slate-400 shadow-sm focus:border-lemon-400 focus:outline-none focus:ring-2 focus:ring-lemon-400 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-200 sm:px-2 sm:text-sm ${
                          showErrors && teensy.used
                            ? "border-red-450 text-red-450 focus:border-red-450 focus:ring-red-450"
                            : ""
                        }`}
                        placeholder="example"
                        value={teensy.slug}
                        onChange={(e) => {
                          const newTeensies = [...multipleTeensiesData];
                          newTeensies[index]!.slug = e.target.value;
                          newTeensies[index]!.used = false;
                          flushSync(() => {
                            setMultipleTeensiesData(newTeensies);
                          });
                        }}
                      />
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-4 text-sm">
                        <button
                          type="button"
                          className="bg-gray-450 rounded bg-white p-2 text-black  dark:bg-gray-700 dark:text-gray-200"
                          onClick={() => {
                            const slug = nanoidForSlug();
                            const newTeensies = [...multipleTeensiesData];
                            newTeensies[index]!.slug = slug;
                            newTeensies[index]!.used = false;
                            setMultipleTeensiesData(newTeensies);
                          }}
                        >
                          Generate Random Alias
                        </button>
                        {multipleTeensiesData.length !== 1 && (
                          <button
                            type="button"
                            className="rounded bg-red-450 p-2 text-white dark:text-gray-200 "
                            onClick={() => {
                              if (multipleTeensiesData.length === 1) return;
                              const newTeensies = [...multipleTeensiesData];
                              newTeensies.splice(index, 1);
                              setMultipleTeensiesData(newTeensies);
                            }}
                          >
                            <MdBlock className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 px-6 py-4 text-center">
          <button
            className="rounded-md bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200"
            onClick={addTeensy}
            type="button"
          >
            Add one more
          </button>
          <button
            className="rounded-md bg-gray-100 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-200"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Multiple;
