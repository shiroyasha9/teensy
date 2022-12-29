import { useAtom, useSetAtom } from "jotai";
import debounce from "lodash/debounce";
import { nanoid } from "nanoid";
import type { NextPage } from "next";
import { useEffect } from "react";
import { formAtom, isSuccessfulAtom, teensyUrlAtom } from "../stores";
import { trpc } from "../utils/trpc";
import Button from "./Button";
import Input from "./Input";

const CreateLink: NextPage = () => {
  const [form, setForm] = useAtom(formAtom);
  const [teensyUrl, setTeensyUrl] = useAtom(teensyUrlAtom);
  const setIsSuccessful = useSetAtom(isSuccessfulAtom);

  const createSlug = trpc.createSlug.useMutation();

  useEffect(() => {
    if (window && window?.location?.hostname) {
      const host = window.location.hostname;
      if (host === "localhost") {
        setTeensyUrl(`localhost:${window.location.port}`);
      } else {
        setTeensyUrl(host);
      }
    }
  }, []);

  useEffect(() => {
    if (createSlug.status === "success") {
      setIsSuccessful(true);
    }
  }, [createSlug, setIsSuccessful]);

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
      className="flex w-full flex-col justify-center gap-4 p-3 sm:w-2/3 md:w-1/2 lg:w-1/3"
    >
      <div>
        <span className="mr-2 whitespace-nowrap text-sm font-medium">
          🤏 Link to teensy
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
            <span className="text-center font-medium text-red-450">
              Already in use.
            </span>
          )}
        </span>
        <div className="flex items-center">
          <span className="mr-1 whitespace-nowrap font-medium">
            {teensyUrl.replaceAll(/https?:\/\//gi, "")}/
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
        title="Teensy it!"
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
