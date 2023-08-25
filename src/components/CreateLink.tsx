import { formAtom, isSuccessfulAtom, showAuthModalAtom } from "@/store";
import { api } from "@/utils/api";
import { useAtomValue, useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import TeensyForm from "./TeensyForm";

const CreateLink = () => {
  const form = useAtomValue(formAtom);
  const setIsSuccessful = useSetAtom(isSuccessfulAtom);
  const setShowAuthModal = useSetAtom(showAuthModalAtom);
  const { data: session, status } = useSession();

  const createSlug = api.createSlug.useMutation();

  function formSubmitHandler() {
    createSlug.mutate({
      slug: form.slug,
      url: form.url,
      ownerId: status === "authenticated" ? session?.user?.id : undefined,
      password: form.isPasswordProtected ? form.password : undefined,
      expiresIn: form.isAutoDelete ? form.expiresIn : undefined,
    });
  }

  useEffect(() => {
    if (createSlug.status === "success") {
      setIsSuccessful(true);
    }
  }, [createSlug, setIsSuccessful]);

  return (
    <>
      <TeensyForm formSubmitHandler={formSubmitHandler} />
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
    </>
  );
};

export default CreateLink;
