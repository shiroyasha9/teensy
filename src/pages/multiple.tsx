import { showErrorMessage, showToastMessage } from "$utils/functions";
import React, { ChangeEvent, useState } from "react";
import { api } from "$utils/api";
import { flushSync } from "react-dom";
import { useAtom } from "jotai";
import { multipleFormAtom } from "$store";
const Multiple = () => {
  const [showErrors, setShowErrors] = useState(false);
  //   const [multipleTeensiesData, setMultipleFormAtom] = useState([
  //     { slug: "", url: "", used: false },
  //   ]);
  const [multipleTeensiesData, setMultipleFormAtom] = useAtom(multipleFormAtom);
  const addTeensy = () => {
    setMultipleFormAtom([
      ...multipleTeensiesData,
      { slug: "", url: "", used: false, isPasswordProtected: false },
    ]);
  };
  const { mutateAsync: checkSlugs, data } = api.slugCheckMultiple.useMutation();

  const handleSubmitCreateTeensies = async () => {
    await checkSlugs(multipleTeensiesData);
    console.log({ multipleTeensiesData, data });
    setMultipleFormAtom(
      multipleTeensiesData.map((teensy, index) => {
        if (data?.usedSlugs?.includes(teensy.slug)) {
          return { ...teensy, used: true };
        } else return { ...teensy, used: false };
      }),
    );
    if (data && data.usedSlugs?.length > 0) {
      setShowErrors(true);

      showErrorMessage("Some of the aliases are already taken");
      return;
    }

    if (
      multipleTeensiesData.some(
        (teensy) => teensy.url === "" || teensy.slug === "",
      )
    ) {
      setShowErrors(true);
      showErrorMessage("Please fill all the fields");
      return;
    } else showToastMessage("Teensies created successfully");

    console.log({ multipleTeensiesData });
  };
  return (
    <>
      <div>Multiple</div>
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
                      type="text"
                      className="w-full rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-sm text-gray-700 focus:border-gray-400 focus:bg-white focus:outline-none"
                      placeholder="https://example.com"
                      value={teensy.url}
                      onChange={(e) => {
                        const newTeensies = [...multipleTeensiesData];
                        newTeensies[index].url = e.target.value;
                        flushSync(() => {
                          setMultipleFormAtom(newTeensies);
                        });
                      }}
                    />
                    {showErrors && teensy.url === "" && (
                      <span className="text-xs italic text-red-500">
                        This is a required field
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      className="w-full rounded-md border border-gray-300 bg-gray-100 px-2 py-1 text-sm text-gray-700 focus:border-gray-400 focus:bg-white focus:outline-none"
                      placeholder="example"
                      value={teensy.slug}
                      onChange={(e) => {
                        const newTeensies = [...multipleTeensiesData];
                        newTeensies[index].slug = e.target.value;
                        newTeensies[index].used = false;
                        flushSync(() => {
                          setMultipleFormAtom(newTeensies);
                        });
                      }}
                    />
                    {showErrors && teensy.slug === "" && (
                      <p className="text-xs italic text-red-500">
                        This is a required field
                      </p>
                    )}
                    {showErrors && teensy.used && (
                      <p className="text-xs italic text-red-500">
                        This alias is already taken
                      </p>
                    )}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <button
                        className=""
                        onClick={() => {
                          showToastMessage("Copied to clipboard");
                        }}
                      >
                        Generate Random Alias
                      </button>
                      {multipleTeensiesData.length !== 1 && (
                        <button
                          className=""
                          onClick={() => {
                            if (multipleTeensiesData.length === 1) return;
                            const newTeensies = [...multipleTeensiesData];
                            newTeensies.splice(index, 1);
                            setMultipleFormAtom(newTeensies);
                          }}
                        >
                          x
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
      <div className="flex flex-wrap gap-4 px-6 py-4 text-center">
        <button
          className="rounded-md bg-gray-100 py-2 px-4 font-semibold text-gray-700 hover:bg-gray-200"
          onClick={addTeensy}
        >
          Add one more
        </button>
        <button
          className="rounded-md bg-gray-100 py-2 px-4 font-semibold text-gray-700 hover:bg-gray-200"
          onClick={handleSubmitCreateTeensies}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Multiple;
