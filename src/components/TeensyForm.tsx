"use client";

import { trpc } from "@/app/_trpc/client";
import { AUTO_DELETE_OPTIONS, NOT_ALLOWED_SLUGS } from "@/constants";
import { env } from "@/env.mjs";
import { cn, getFormattedTime, getRemaingTime, nanoidForSlug } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Teensy } from "@prisma/client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import Dropdown from "./Dropdown";
import Input from "./Input";
import { Button } from "./ui/button";

const formSchema = z
  .object({
    slug: z
      .string()
      .min(1, "Enter a valid alias.")
      .max(20, "Enter a valid alias.")
      .regex(/^[a-zA-Z0-9-]+$/, "Use only alphanumeric values or -"),
    url: z.string().url("Enter a valid URL").min(1, "Enter a valid URL"),
    isPasswordProtected: z.boolean(),
    password: z.string().optional(),
    isAutoDelete: z.boolean(),
    expiresAt: z.date().optional(),
    expiresIn: z.number().optional(),
  })
  .refine((data) => {
    if (
      data.isPasswordProtected &&
      (!data.password || data.password.length < 5)
    ) {
      return false;
    }
    return true;
  }, "Enter a valid password")
  .refine((data) => {
    if (data.isAutoDelete && !data.expiresIn) {
      return false;
    }
    return true;
  }, "Select a valid expiry duration");

type FormValues = z.infer<typeof formSchema>;

type TeensyFormProps = {
  ownerId: string | undefined;
  onClose?: () => void;
  mode?: "create" | "edit";
  currentTeensy?: Teensy;
};

const TeensyForm = (props: TeensyFormProps) => {
  const { ownerId, mode = "create", currentTeensy, onClose } = props;
  const { theme } = useTheme();
  const router = useRouter();

  const {
    watch,
    setValue,
    handleSubmit,
    register,
    trigger,
    formState: { errors, isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      slug: currentTeensy?.slug ?? "",
      url: currentTeensy?.url ?? "",
      isPasswordProtected: !!currentTeensy?.password ?? false,
      password: currentTeensy?.password ?? undefined,
      isAutoDelete: !!currentTeensy?.expiresAt ?? false,
      expiresIn: undefined,
      expiresAt: currentTeensy?.expiresAt ?? undefined,
    },
  });

  const slug = watch("slug");
  const isPasswordProtected = watch("isPasswordProtected");
  const isAutoDelete = watch("isAutoDelete");
  const expiresIn = watch("expiresIn");
  const additionalIsSlugInvalid =
    mode === "edit" ? slug !== currentTeensy?.slug : false;

  const slugCheck = trpc.slugCheck.useQuery(
    { slug },
    {
      enabled: !!slug,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );

  const createSlug = trpc.createSlug.useMutation({
    onSuccess: () => {
      router.push(`/success?slug=${slug}`);
    },
  });

  const updateSlug = trpc.updateSlug.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const submitHandler: SubmitHandler<FormValues> = ({
    slug,
    url,
    password,
    isPasswordProtected,
    isAutoDelete,
    expiresIn,
  }) => {
    if (mode === "create") {
      createSlug.mutate({
        slug,
        url,
        ownerId,
        password: isPasswordProtected ? password : undefined,
        expiresIn: isAutoDelete ? expiresIn : undefined,
      });
    } else {
      if (!currentTeensy) return;
      updateSlug.mutate({
        slug,
        url,
        password: isPasswordProtected ? password : undefined,
        id: currentTeensy.id,
      });
      onClose?.();
    }
  };

  const isSlugInvalid =
    !!errors.slug ||
    NOT_ALLOWED_SLUGS.has(slug) ||
    (slugCheck.isFetched &&
      (mode === "edit"
        ? slugCheck.data?.used && additionalIsSlugInvalid
        : slugCheck.data?.used));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(submitHandler)(e);
      }}
      className={cn("flex w-full flex-col justify-center gap-4", {
        "p-3 sm:w-2/3 md:w-1/2 lg:w-1/3": mode === "create",
        "mt-6 p-4 dark:text-white": mode === "edit",
      })}
    >
      <Input
        label="🤏 Link to teensy"
        placeholder="e.g. https://github.com"
        autoFocus
        invalid={!!errors.url}
        variant={mode === "create" ? "primary" : "modal"}
        {...register("url", {
          required: true,
        })}
      />

      <div
        className={cn("flex flex-col rounded-lg p-4", {
          "bg-[#37415180]": mode === "create",
          "bg-gray-300 dark:bg-gray-600": mode === "edit",
        })}
      >
        <span className="mr-2 flex items-center gap-2  whitespace-nowrap text-sm font-medium">
          ✍️ Customize
          {isSlugInvalid && (
            <span className="text-center font-medium text-red-450">
              {errors.slug?.message ? errors.slug.message : "Already in use."}
            </span>
          )}
        </span>
        <Input
          type="text"
          label={`${env.NEXT_PUBLIC_SITE_URL.replaceAll(/https?:\/\//gi, "")}/`}
          inlineLabel
          variant={mode === "create" ? "primary" : "modal"}
          placeholder="alias e.g. ig for instagram"
          invalid={isSlugInvalid}
          title="Only alphanumeric characters and hyphens are allowed. No spaces."
          {...register("slug", {
            required: true,
          })}
        />
        <div className="flex items-center justify-center gap-5">
          <div className="ml-2 flex flex-1 items-center justify-center">or</div>
          <Button
            type="button"
            variant="outline"
            className={cn("m-0 mt-1 w-full text-sm", {
              "border-gray-500 !text-black hover:border-gray-700 dark:border-gray-400 dark:!text-white dark:hover:border-gray-200":
                mode === "edit",
            })}
            onClick={() => {
              const slug = nanoidForSlug();
              setValue("slug", slug);
              void trigger("slug");
            }}
          >
            Generate an alias
          </Button>
        </div>
        <div className="mt-3 flex items-center gap-1">
          <input
            type="checkbox"
            id="password-protection-checkbox"
            {...register("isPasswordProtected")}
          />
          <label
            htmlFor="password-protection-checkbox"
            className="mr-2 whitespace-nowrap text-sm font-medium"
          >
            Password Protection
          </label>
        </div>
        <Input
          disabled={!isPasswordProtected}
          placeholder="e.g. 12345"
          type="password"
          {...register("password")}
        />
        {mode === "create" ? (
          <>
            <div className="mt-3 flex items-center gap-1">
              <input
                type="checkbox"
                id="auto-delete-checkbox"
                {...register("isAutoDelete")}
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
              disabled={!isAutoDelete}
              label={expiresIn ? getFormattedTime(expiresIn) : "e.g 1 day"}
              onChange={(mins: number) => {
                setValue("expiresIn", mins);
                void trigger("expiresIn");
              }}
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
        variant={theme === "dark" || mode === "create" ? "default" : "tertiary"}
        className="mb-2 w-full self-center"
        isLoading={isSubmitting}
        disabled={isSlugInvalid || !isValid || slugCheck.isRefetching}
      >
        {mode === "create" ? "Teensy it!" : "Edit it!"}
      </Button>
      {mode === "create" && (
        <Link href="/multiple" className="text-center text-sm text-primary">
          or Create multiple Teensies at once🚀
        </Link>
      )}
    </form>
  );
};

export default TeensyForm;
