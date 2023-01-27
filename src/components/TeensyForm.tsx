import { NOT_ALLOWED_SLUGS } from "$constants";
import { formAtom, teensyUrlAtom } from "$store";
import { api } from "$utils/api";
import { nanoidForSlug } from "$utils/functions";

import classNames from "classnames";
import { useAtom } from "jotai";
import { debounce } from "lodash";
import { useTheme } from "next-themes";
import { useEffect } from "react";

import Button from "./Button";
import Input from "./Input";

type TeensyFormProps = {
  formSubmitHandler: () => void;
  mode?: "create" | "edit";
  additionalIsSlugInvalid?: boolean;
};

const TeensyForm = (props: TeensyFormProps) => {
  const { formSubmitHandler, mode = "create", additionalIsSlugInvalid } = props;
  const [form, setForm] = useAtom(formAtom);
  const [teensyUrl, setTeensyUrl] = useAtom(teensyUrlAtom);
  const { theme } = useTheme();

  const slugCheck = api.slugCheck.useQuery(
    { slug: form.slug },
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const isSlugInvalid =
    NOT_ALLOWED_SLUGS.has(form.slug) ||
    (slugCheck.isFetched &&
      (mode === "edit"
        ? slugCheck.data?.used && additionalIsSlugInvalid
        : slugCheck.data?.used));

  const formClassNames = classNames(
    "flex w-full flex-col justify-center gap-4",
    {
      "p-3 sm:w-2/3 md:w-1/2 lg:w-1/3": mode === "create",
      "mt-6 p-4 dark:text-white": mode === "edit",
    },
  );

  const customizeContainerClassNames = classNames(
    "flex flex-col rounded-lg p-4",
    {
      "bg-[#37415180]": mode === "create",
      "bg-gray-300 dark:bg-gray-600": mode === "edit",
    },
  );

  const generateAliasButtonClassNames = classNames("m-0 mt-1 w-full text-sm", {
    "border-gray-500 !text-black hover:border-gray-700 dark:border-gray-400 dark:!text-white dark:hover:border-gray-200":
      mode === "edit",
  });

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

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formSubmitHandler();
      }}
      className={formClassNames}
    >
      <Input
        type="url"
        label="🤏 Link to teensy"
        onChange={(e) => setForm({ ...form, url: e.target.value })}
        placeholder="e.g. https://github.com"
        value={form.url}
        required
        id="url"
        variant={mode === "create" ? "primary" : "modal"}
      />

      <div className={customizeContainerClassNames}>
        <span className="mr-2 flex items-center gap-2  whitespace-nowrap text-sm font-medium">
          ✍️ Customize
          {isSlugInvalid && (
            <span className="text-center font-medium text-red-450">
              Already in use.
            </span>
          )}
        </span>
        <Input
          type="text"
          label={`${teensyUrl.replaceAll(/https?:\/\//gi, "")}/`}
          inlineLabel
          variant={mode === "create" ? "primary" : "modal"}
          onChange={(e) => {
            setForm({
              ...form,
              slug: e.target.value,
            });
            debounce(slugCheck.refetch, 300);
          }}
          minLength={1}
          placeholder="alias e.g. ig for instagram"
          invalid={isSlugInvalid}
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
            className={generateAliasButtonClassNames}
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
        title={mode === "create" ? "Teensy it!" : "Edit it!"}
        variant={theme === "dark" || mode === "create" ? "primary" : "tertiary"}
        className="mb-2 w-full self-center"
        disabled={isSlugInvalid || !form.url || !form.slug}
      />
    </form>
  );
};

export default TeensyForm;
