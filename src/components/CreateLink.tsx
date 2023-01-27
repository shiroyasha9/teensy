import {
  formAtom,
  isSuccessfulAtom,
  showAuthModalAtom,
  teensyUrlAtom,
} from "$store";
import { api } from "$utils/api";
import { nanoidForSlug } from "$utils/functions";
import { useAtom, useSetAtom } from "jotai";
import debounce from "lodash/debounce";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Button from "./Button";
import Input from "./Input";

const CreateLink = () => {
  const [form, setForm] = useAtom(formAtom);
  const [teensyUrl, setTeensyUrl] = useAtom(teensyUrlAtom);
  const setIsSuccessful = useSetAtom(isSuccessfulAtom);
  const { data: session, status } = useSession();
  const setShowAuthModal = useSetAtom(showAuthModalAtom);

  const createSlug = api.createSlug.useMutation();

  useEffect(() => {
    if (window && window?.location?.hostname) {
      const host = window.location.hostname;
      if (host === "localhost") {
        setTeensyUrl(`localhost:${window.location.port}`);
      } else {
        setTeensyUrl(host);
      }
      setForm({ slug: "", url: "" });
    }
  }, []);

  useEffect(() => {
    if (createSlug.status === "success") {
      setIsSuccessful(true);
    }
  }, [createSlug, setIsSuccessful]);

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
        createSlug.mutate({
          ...form,
          ownerId: status === "authenticated" ? session?.user?.id : undefined,
        });
      }}
      className="flex w-full flex-col justify-center gap-4 p-3 sm:w-2/3 md:w-1/2 lg:w-1/3"
    >
      <Input
        type="url"
        onChange={(e) => setForm({ ...form, url: e.target.value })}
        placeholder="e.g. https://github.com"
        id="url"
        value={form.url}
        label="🤏 Link to teensy"
        required
      />

      <div className="flex flex-col rounded-lg bg-[#37415180] p-4">
        <span className="mr-2 flex items-center gap-2  whitespace-nowrap text-sm font-medium ">
          ✍️ Customize
          {slugCheck.data?.used && (
            <span className="text-center font-medium text-red-450">
              Already in use.
            </span>
          )}
        </span>
        <Input
          type="text"
          label={`${teensyUrl.replaceAll(/https?:\/\//gi, "")}/`}
          inlineLabel
          onChange={(e) => {
            setForm({
              ...form,
              slug: e.target.value,
            });
            debounce(slugCheck.refetch, 300);
          }}
          minLength={1}
          placeholder="alias e.g. ig for instagram"
          invalid={slugCheck.isFetched && slugCheck.data?.used}
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
            className="m-0 mt-1 w-full text-sm"
            onClick={() => {
              const slug = nanoidForSlug();
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
        title="Teensy it!"
        className="mb-2 w-full self-center"
        disabled={
          (slugCheck.isFetched && slugCheck.data?.used) ||
          !form.url ||
          !form.slug
        }
      />
      {!session?.user && status !== "loading" && (
        <p className="text-center text-sm">
          <span
            className="cursor-pointer font-semibold text-lemon-400 hover:text-lemon-200"
            onClick={() => setShowAuthModal(true)}
          >
            Login
          </span>{" "}
          to save this teensy to edit/delete it later.
        </p>
      )}
    </form>
  );
};

export default CreateLink;
