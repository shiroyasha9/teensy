import { showAuthModalAtom } from "@/store";
import { Dialog } from "@headlessui/react";
import { useAtom } from "jotai";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Modal from "./Modal";

const AuthModal = () => {
  const [disabled, setDisabled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useAtom(showAuthModalAtom);

  const signInWithGoogle = () => {
    toast.loading("Redirecting...");
    setDisabled(true);
    // Perform sign in
    void signIn("google", {
      callbackUrl: window.location.href,
    });
  };

  const closeModal = () => {
    setShowAuthModal(false);
  };

  // Reset modal
  useEffect(() => {
    if (!showAuthModal) {
      // Wait for 200ms for aniamtion to finish
      setTimeout(() => {
        setDisabled(false);
      }, 200);
    }
  }, [showAuthModal]);

  // Remove pending toasts if any
  useEffect(() => {
    toast.dismiss();
  }, []);

  return (
    <Modal showModal={showAuthModal} closeModal={closeModal}>
      <div className="py-12">
        <div className="px-4 sm:px-12">
          <Dialog.Title
            as="h3"
            className="mt-6 text-center text-lg font-bold dark:text-white sm:text-2xl"
          >
            Create your account
          </Dialog.Title>

          <Dialog.Description className="mt-2 text-center text-base text-gray-500 dark:text-gray-300">
            Please create an account to save your teensies to edit/delete them
            later.
          </Dialog.Description>

          {/* Sign with Google */}
          <div className="mt-10">
            <button
              disabled={disabled}
              onClick={signInWithGoogle}
              className="mx-auto flex h-[46px] w-full items-center justify-center space-x-2 rounded-md border p-2 text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600"
            >
              <FcGoogle className="h-8 w-8" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
