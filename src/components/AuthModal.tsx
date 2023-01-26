import { showAuthModalAtom } from "$store";
import { isValidEmail } from "$utils/functions";
import { Dialog, Transition } from "@headlessui/react";
import { useAtom } from "jotai";
import { signIn } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { HiMailOpen } from "react-icons/hi";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";

const Confirm = ({ show = false, email = "" }) => (
  <Transition appear show={show} as={Fragment}>
    <div className="fixed inset-0 z-50">
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-white" />
      </Transition.Child>

      <Transition.Child
        as={Fragment}
        enter="ease-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="flex h-full items-center justify-center p-8">
          <div className="transform overflow-hidden transition-all">
            <h3 className="text-center text-lg font-medium leading-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <HiMailOpen className="h-12 w-12 shrink-0 text-purple-600" />
              </div>
              <p className="mt-2 text-2xl font-semibold">Confirm your email</p>
            </h3>

            <p className="mt-4 text-center text-lg">
              We emailed a magic link to <strong>{email ?? ""}</strong>.
              <br />
              Check your inbox and click the link in the email to login or sign
              up.
            </p>
          </div>
        </div>
      </Transition.Child>
    </div>
  </Transition>
);

const AuthModal = () => {
  const [disabled, setDisabled] = useState(false);
  const [showConfirm, setConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [showAuthModal, setShowAuthModal] = useAtom(showAuthModalAtom);
  const { theme } = useTheme();

  const signInWithEmail = async () => {
    const toastId = toast.loading("Loading...");
    try {
      setDisabled(true);
      // Perform sign in
      const res = await signIn("email", {
        redirect: false,
        callbackUrl: window.location.href,
        email,
      });
      // Something went wrong
      if (res?.status !== 200) {
        throw new Error(res?.error);
      }
      setConfirm(true);
      toast.dismiss(toastId);
    } catch (err) {
      toast.error("Unable to sign in", { id: toastId });
    } finally {
      setDisabled(false);
    }
  };

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
        setConfirm(false);
        setEmail("");
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
            Please create an account to save your teenies to edit/delete them
            later.
          </Dialog.Description>

          <div className="mt-10">
            {/* Sign with email */}
            <Input
              name="email"
              type="email"
              placeholder="rick@roll.com"
              disabled={disabled}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3 focus:!border-purple-600 focus:!ring-purple-600"
            />
            <Button
              title="Login with Email"
              variant={theme === "dark" ? "primary" : "tertiary"}
              className="!m-0 w-full text-base font-normal dark:font-semibold"
              disabled={disabled || !isValidEmail(email)}
              onClick={() => void signInWithEmail()}
            />
            <Confirm show={showConfirm} email={email ?? ""} />
            <p className="my-2 text-center text-sm text-gray-400 dark:text-gray-300">
              or
            </p>
            {/* Sign with Google */}
            <button
              disabled={disabled}
              onClick={signInWithGoogle}
              className="mx-auto flex h-[46px] w-full items-center justify-center space-x-2 rounded-md border p-2 text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600"
            >
              <Image src="/google.svg" alt="Google" width={32} height={32} />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
