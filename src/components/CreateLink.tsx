"use client";

import { trpc } from "@/app/_trpc/client";
import { formAtom } from "@/store";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import TeensyForm from "./TeensyForm";

type CreateLinkProps = {
  ownerId: string | undefined;
};

const CreateLink = ({ ownerId }: CreateLinkProps) => {
  const form = useAtomValue(formAtom);
  const router = useRouter();

  const createSlug = trpc.createSlug.useMutation({
    onSuccess: () => {
      router.push(`/success?slug=${form.slug}`);
    },
  });

  function formSubmitHandler() {
    createSlug.mutate({
      slug: form.slug,
      url: form.url,
      ownerId,
      password: form.isPasswordProtected ? form.password : undefined,
      expiresIn: form.isAutoDelete ? form.expiresIn : undefined,
    });
  }

  return <TeensyForm formSubmitHandler={formSubmitHandler} />;
};

export default CreateLink;
