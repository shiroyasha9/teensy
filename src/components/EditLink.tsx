import { formAtom } from "$store";
import { api } from "$utils/api";
import type { Teensy } from "@prisma/client";
import { useAtom } from "jotai";
import { useEffect } from "react";
import TeensyForm from "./TeensyForm";

type EditLinkProps = {
  currentTeensy: Teensy;
  onClose: () => void;
};

const EditLink = ({ currentTeensy, onClose }: EditLinkProps) => {
  const [form, setForm] = useAtom(formAtom);

  const updateSlug = api.updateSlug.useMutation();

  function formSubmitHandler() {
    updateSlug.mutate({
      slug: form.slug,
      url: form.url,
      password: form.isPasswordProtected ? form.password : undefined,
      id: currentTeensy.id,
    });
  }

  useEffect(() => {
    setForm({
      url: currentTeensy.url,
      slug: currentTeensy.slug,
      isPasswordProtected: !!currentTeensy.password,
      password: currentTeensy.password ?? undefined,
    });
  }, [currentTeensy, setForm]);

  useEffect(() => {
    if (updateSlug.status === "success") {
      onClose();
    }
  }, [updateSlug, onClose]);

  return (
    <TeensyForm
      formSubmitHandler={formSubmitHandler}
      mode="edit"
      additionalIsSlugInvalid={form.slug !== currentTeensy.slug}
      currentTeensy={currentTeensy}
    />
  );
};

export default EditLink;
