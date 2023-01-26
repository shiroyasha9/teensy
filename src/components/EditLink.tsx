import { formAtom, teensyUrlAtom } from "$store";
import { api } from "$utils/api";
import type { Teensy } from "@prisma/client";
import { useAtom } from "jotai";
import { debounce } from "lodash";
import { nanoid } from "nanoid";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import Button from "./Button";
import Input from "./Input";

type EditLinkProps = {
  currentTeensy: Teensy;
  onClose: () => void;
};

const EditLink = ({ currentTeensy, onClose }: EditLinkProps) => {
  const [form, setForm] = useAtom(formAtom);
  const [teensyUrl, setTeensyUrl] = useAtom(teensyUrlAtom);
  const { theme } = useTheme();

  const updateSlug = api.updateSlug.useMutation();

  useEffect(() => {
    setForm({ url: currentTeensy.url, slug: currentTeensy.slug });
  }, [currentTeensy, setForm]);

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
    if (updateSlug.status === "success") {
      onClose();
    }
  }, [updateSlug, onClose]);

  const slugCheck = api.slugCheck.useQuery(
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
        updateSlug.mutate({ ...form, id: currentTeensy.id });
      }}
      className="mt-6 flex w-full flex-col justify-center gap-4 p-4 dark:text-white"
    >
      <Input
        type="url"
        label=" 🤏 Link to teensy"
        onChange={(e) => setForm({ ...form, url: e.target.value })}
        placeholder="e.g. https://github.com"
        required
        value={form.url}
        variant="modal"
      />

      <div className="flex flex-col rounded-lg bg-gray-300 p-4 dark:bg-gray-600">
        <span className="mr-2 flex items-center gap-2  whitespace-nowrap text-sm font-medium">
          ✍️ Customize
          {slugCheck.data?.used && form.slug !== currentTeensy.slug && (
            <span className="text-center font-medium text-red-450">
              Already in use.
            </span>
          )}
        </span>
        <Input
          type="text"
          label={`${teensyUrl.replaceAll(/https?:\/\//gi, "")}/`}
          inlineLabel
          variant="modal"
          onChange={(e) => {
            setForm({
              ...form,
              slug: e.target.value,
            });
            debounce(slugCheck.refetch, 300);
          }}
          minLength={1}
          placeholder="alias e.g. ig for instagram"
          invalid={
            slugCheck.isFetched &&
            slugCheck.data!.used &&
            form.slug !== currentTeensy.slug
          }
          value={form.slug}
          pattern={"^[-a-zA-Z0-9]+$"}
          title="Only alphanumeric characters and hypens are allowed. No spaces."
          required
        />
        <div className="flex items-center justify-center gap-5">
          <div className="ml-2 flex flex-1 items-center justify-center">or</div>
          <Button
            variant="outlined"
            title="Generate an alias"
            className="m-0 mt-1 w-full border-gray-500 text-sm !text-black hover:border-gray-700 dark:border-gray-400 dark:!text-white dark:hover:border-gray-200"
            onClick={() => {
              const slug = nanoid();
              setForm({
                ...form,
                slug,
              });
              void slugCheck.refetch();
            }}
          />
        </div>
      </div>
      <Button
        type="submit"
        variant={theme === "dark" ? "primary" : "tertiary"}
        title="Edit it!"
        className="w-full self-center"
        disabled={
          (slugCheck.isFetched &&
            slugCheck.data!.used &&
            form.slug !== currentTeensy.slug) ||
          !form.url ||
          !form.slug
        }
      />
    </form>
  );
};

export default EditLink;
