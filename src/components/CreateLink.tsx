import debounce from "lodash/debounce";
import { nanoid } from "nanoid";
import type { NextPage } from "next";
import { useEffect } from "react";
import { FormData } from "../types";
import { trpc } from "../utils/trpc";
import Button from "./Button";
import Input from "./Input";

type Props = {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  form: FormData;
  setForm: React.Dispatch<React.SetStateAction<FormData>>;
  onSuccessHandler: () => void;
};

const CreateLink: NextPage<Props> = (props) => {
  const { url, setUrl, form, setForm, onSuccessHandler } = props;
  const createSlug = trpc.createSlug.useMutation();

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

  useEffect(() => {
    if (createSlug.status === "success") {
      onSuccessHandler();
    }
  }, [createSlug, onSuccessHandler]);

  const slugCheck = trpc.slugCheck.useQuery(
    { slug: form.slug },
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

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
          <Input
            type="url"
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="e.g. https://github.com"
            required
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
          <Input
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
            invalid={slugCheck.isFetched && slugCheck.data!.used}
            value={form.slug}
            pattern={"^[-a-zA-Z0-9]+$"}
            title="Only alphanumeric characters and hypens are allowed. No spaces."
            required
          />
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className="ml-2 flex flex-1 items-center justify-center">or</div>
          <Button
            variant="outlined"
            title="Generate an alias"
            className="m-0 mt-1 w-full text-sm"
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
      <Button
        type="submit"
        title="Teeny tiny it!"
        className="w-full self-center"
        disabled={
          (slugCheck.isFetched && slugCheck.data!.used) ||
          !form.url ||
          !form.slug
        }
      />
    </form>
  );
};

export default CreateLink;
