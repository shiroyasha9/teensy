import classNames from "classnames";
import copy from "copy-to-clipboard";
import debounce from "lodash/debounce";
import { nanoid } from "nanoid";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { trpc } from "../utils/trpc";

type Form = {
  slug: string;
  url: string;
};

const CreateLink: NextPage = () => {
  const [form, setForm] = useState<Form>({ slug: "", url: "" });
  const [url, setUrl] = useState("teeny.tk");

  const showToastMessage = () => {
    toast("Link Copied!", {
      icon: "✅",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  useEffect(() => {
    if (window && window?.location?.hostname) {
      const host = window.location.hostname;
      if (host === "localhost") {
        setUrl(`localhost:${window.location.port}`);
      } else {
        setUrl(host);
      }
    }
  }, []);

  const slugCheck = trpc.slugCheck.useQuery(
    { slug: form.slug },
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
  const createSlug = trpc.createSlug.useMutation();

  const input =
    "text-black my-1 py-2 px-3 sm:px-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-lemon-400 focus:ring-lemon-400 block w-full rounded-md sm:text-sm focus:ring-1";

  const slugInput = classNames(input, {
    "border-red-500": slugCheck.isFetched && slugCheck.data!.used,
    "text-red-500": slugCheck.isFetched && slugCheck.data!.used,
  });

  if (createSlug.status === "success") {
    return (
      <>
        <h1 className="mb-5 flex cursor-default justify-center text-5xl text-lemon-400">
          teeny
        </h1>
        <div className="flex flex-col items-center justify-center">
          <h3 className="mb-3 text-xl">
            Successful! 🥳 Here&apos;s your teeny link:{" "}
          </h3>
          <a
            href={`/${form.slug}`}
            className="mt-1 rounded-2xl bg-gray-200/30 px-3 py-1"
          >
            <h1>{`${url}/${form.slug}`}</h1>
          </a>
        </div>
        <div className="">
          <input
            type="button"
            value="Copy Link"
            className="m-5 cursor-pointer rounded-md bg-lemon-400 py-2 px-3 font-semibold text-gray-950"
            onClick={() => {
              copy(`${window.location.protocol}//${url}/${form.slug}`);
              showToastMessage();
            }}
          />
          <input
            type="button"
            value="Another one"
            className="m-5 cursor-pointer rounded-md bg-white py-2 px-3 font-semibold text-gray-950"
            onClick={() => {
              createSlug.reset();
              setForm({ slug: "", url: "" });
            }}
          />
        </div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createSlug.mutate({ ...form });
      }}
      className="flex h-screen w-full flex-col justify-center gap-4 p-6 sm:w-2/3   md:w-1/2 lg:w-1/3"
    >
      <h1 className="mb-5 flex cursor-default justify-center text-5xl text-lemon-400">
        teeny
      </h1>
      <div>
        <span className="mr-2 whitespace-nowrap text-sm font-medium">
          🤏 Link to teenify
        </span>
        <div className="flex items-center">
          <input
            type="url"
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="e.g. https://github.com"
            required
            className={input}
          />
        </div>
      </div>

      <div className="flex flex-col rounded-lg bg-[#37415180] p-4">
        <span className="mr-2 flex items-center gap-2  whitespace-nowrap text-sm font-medium ">
          ✍️ Customize
          {slugCheck.data?.used && (
            <span className="text-center font-medium text-red-500">
              Already in use.
            </span>
          )}
        </span>
        <div className="flex items-center">
          <span className="mr-1 whitespace-nowrap font-medium">
            {url.replaceAll(/https?:\/\//gi, "")}/
          </span>
          <input
            type="text"
            onChange={(e) => {
              setForm({
                ...form,
                slug: e.target.value,
              });
              debounce(slugCheck.refetch, 300);
            }}
            minLength={1}
            placeholder="alias e.g. ig for instagram"
            className={slugInput}
            value={form.slug}
            pattern={"^[-a-zA-Z0-9]+$"}
            title="Only alphanumeric characters and hypens are allowed. No spaces."
            required
          />
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className="ml-2 flex flex-1 items-center justify-center">or</div>
          <input
            type="button"
            value="Generate an alias"
            className="w-50 mt-1 w-full cursor-pointer rounded-md border-2 border-lemon-400 py-2 px-3"
            onClick={() => {
              const slug = nanoid();
              setForm({
                ...form,
                slug,
              });
              slugCheck.refetch();
            }}
          />
        </div>
      </div>

      <input
        type="submit"
        value="Teeny tiny it!"
        className="cursor-pointer rounded-md bg-lemon-400 py-2 px-3 text-lg font-semibold text-gray-950"
        disabled={slugCheck.isFetched && slugCheck.data!.used}
      />
    </form>
  );
};

export default CreateLink;
