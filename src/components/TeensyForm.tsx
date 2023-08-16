import { NOT_ALLOWED_SLUGS } from "$constants";
import useAutoFocus from "$hooks/useAutoFocus";
import { formAtom, teensyUrlAtom } from "$store";
import { api } from "$utils/api";

import classNames from "classnames";
import { useAtom } from "jotai";
import debounce from "lodash.debounce";
import { useTheme } from "next-themes";
import { useEffect, useRef, type ChangeEvent } from "react";

import type { AutoDeleteDropdownData } from "$types";
import {
  getFormattedTime,
  getRemaingTime,
  nanoidForSlug,
} from "$utils/functions";
import type { Teensy } from "@prisma/client";
import Link from "next/link";
import { useMemo } from "react";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Input from "./Input";

type TeensyFormProps = {
  formSubmitHandler: () => void;
  mode?: "create" | "edit";
  additionalIsSlugInvalid?: boolean;
  currentTeensy?: Teensy;
};

const TeensyForm = (props: TeensyFormProps) => {
  const {
    formSubmitHandler,
    mode = "create",
    additionalIsSlugInvalid,
    currentTeensy,
  } = props;
  const [form, setForm] = useAtom(formAtom);
  const [teensyUrl, setTeensyUrl] = useAtom(teensyUrlAtom);
  const aliasInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const urlInput = useAutoFocus();

  const AUTO_DELETE_OPTIONS: AutoDeleteDropdownData[] = [
    {
      label: "1 hour",
      minutesToExpire: 60,
    },
    {
      label: "4 hours",
      minutesToExpire: 60 * 4,
    },
    {
      label: "8 hours",
      minutesToExpire: 60 * 8,
    },
    {
      label: "1 day",
      minutesToExpire: 60 * 24,
    },
  ];

  const slugCheck = api.slugCheck.useQuery(
    { slug: form.slug },
    {
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const isSlugInvalid =
    form.slug.includes(" ") ||
    NOT_ALLOWED_SLUGS.has(form.slug) ||
    slugCheck.isRefetching ||
    (slugCheck.isFetched &&
      (mode === "edit"
        ? slugCheck.data?.used && additionalIsSlugInvalid
        : slugCheck.data?.used));

  function handleSlugChange(e: ChangeEvent<HTMLInputElement>) {
    setForm((prevData) => ({
      ...prevData,
      slug: e.target.value,
    }));
    void slugCheck.refetch();
  }

  const debouncedSlugChangeHandler = useMemo(() => {
    return debounce(handleSlugChange, 200);
  }, []);

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
    return () => {
      debouncedSlugChangeHandler.cancel();
    };
  });

  useEffect(() => {
    if (window && window?.location?.hostname) {
      const host = window.location.hostname;
      if (host === "localhost") {
        setTeensyUrl(`localhost:${window.location.port}`);
      } else {
        setTeensyUrl(host);
      }
      setForm({
        slug: "",
        url: "",
        isPasswordProtected: false,
        password: undefined,
        isAutoDelete: false,
        expiresIn: undefined,
      });
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
        onChange={(e) =>
          setForm((prevData) => ({ ...prevData, url: e.target.value }))
        }
        placeholder="e.g. https://github.com"
        value={form.url}
        required
        id="url"
        ref={urlInput}
        variant={mode === "create" ? "primary" : "modal"}
      />

      <div className={customizeContainerClassNames}>
        <span className="mr-2 flex items-center gap-2  whitespace-nowrap text-sm font-medium">
          ✍️ Customize
          {isSlugInvalid && (
            <span className="text-center font-medium text-red-450">
              {form.slug.includes(" ")
                ? "Alias cannot contain spaces."
                : "Already in use."}
            </span>
          )}
        </span>
        <Input
          type="text"
          label={`${teensyUrl.replaceAll(/https?:\/\//gi, "")}/`}
          inlineLabel
          variant={mode === "create" ? "primary" : "modal"}
          onChange={debouncedSlugChangeHandler}
          minLength={1}
          placeholder="alias e.g. ig for instagram"
          invalid={isSlugInvalid}
          defaultValue={currentTeensy?.slug || ""}
          pattern={"^[-a-zA-Z0-9]+$"}
          title="Only alphanumeric characters and hypens are allowed. No spaces."
          required
          ref={aliasInputRef}
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
              if (aliasInputRef.current) {
                aliasInputRef.current.value = slug;
              }
              void slugCheck.refetch();
            }}
          />
        </div>
        <div className="mt-3 flex items-center gap-1">
          <input
            type="checkbox"
            id="password-protection-checkbox"
            checked={form.isPasswordProtected}
            onChange={(e) =>
              setForm((prevData) => ({
                ...prevData,
                isPasswordProtected: e.target.checked,
              }))
            }
          />
          <label
            htmlFor="password-protection-checkbox"
            className="mr-2 whitespace-nowrap text-sm font-medium"
          >
            Password Protection
          </label>
        </div>
        <Input
          disabled={!form.isPasswordProtected}
          placeholder="e.g. 12345"
          type="password"
          minLength={5}
          value={form.password}
          onChange={(e) =>
            setForm((prevData) => ({
              ...prevData,
              password: e.target.value,
            }))
          }
          required={form.isPasswordProtected}
        />
        {mode === "create" ? (
          <>
            <div className="mt-3 flex items-center gap-1">
              <input
                type="checkbox"
                id="auto-delete-checkbox"
                checked={form.isAutoDelete}
                onChange={(e) =>
                  setForm((prevData) => ({
                    ...prevData,
                    isAutoDelete: e.target.checked,
                  }))
                }
              />
              <label
                htmlFor="auto-delete-checkbox"
                className="mr-2 whitespace-nowrap text-sm font-medium"
              >
                Auto delete in
              </label>
            </div>
            <Dropdown
              data={AUTO_DELETE_OPTIONS}
              disabled={!form.isAutoDelete}
              label={
                form.expiresIn ? getFormattedTime(form.expiresIn) : "e.g 1 day"
              }
              onChange={(mins: number) =>
                setForm((prevData) => ({
                  ...prevData,
                  expiresIn: mins,
                }))
              }
            />
          </>
        ) : (
          currentTeensy &&
          currentTeensy.expiresAt && (
            <label
              htmlFor="auto-delete-checkbox"
              className="whitespace-nowrap text-sm font-medium"
            >
              Auto deletes in{" "}
              {getFormattedTime(
                getRemaingTime(currentTeensy?.expiresAt || new Date()),
              )}
            </label>
          )
        )}
      </div>
      <Button
        type="submit"
        title={mode === "create" ? "Teensy it!" : "Edit it!"}
        variant={theme === "dark" || mode === "create" ? "primary" : "tertiary"}
        className="mb-2 w-full self-center"
        disabled={
          isSlugInvalid ||
          !form.url ||
          !form.slug ||
          (form.isPasswordProtected &&
            (!form.password || form.password.length < 5)) ||
          (form.isAutoDelete && !form.expiresIn)
        }
      />
      <Link href="/multiple" className="text-center text-sm text-lemon-400">
        or Create multiple Teensies at once🚀
      </Link>
    </form>
  );
};

export default TeensyForm;
