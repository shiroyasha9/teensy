import { Dialog, Transition } from "@headlessui/react";
import { useAtom } from "jotai";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { HiMailOpen, HiX } from "react-icons/hi";
import { showAuthModalAtom } from "../stores";
import { isValidEmail } from "../utils/functions";
import Button from "./Button";
import Input from "./Input";

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

  const signInWithEmail = async () => {
    let toastId;
    try {
      toastId = toast.loading("Loading...");
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
    signIn("google", {
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
    <Transition appear show={showAuthModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />

        <div className="min-h-screen text-center text-gray-950">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative my-8 inline-block w-full max-w-md transform overflow-hidden bg-white text-left align-middle shadow-xl transition-all sm:rounded-md">
              {/* Close icon */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 shrink-0 rounded-md p-1 transition hover:bg-gray-100 focus:outline-none"
              >
                <HiX className="h-5 w-5" />
              </button>

              <div className="py-12">
                <div className="px-4 sm:px-12">
                  <Dialog.Title
                    as="h3"
                    className="mt-6 text-center text-lg font-bold sm:text-2xl"
                  >
                    Create your account
                  </Dialog.Title>

                  <Dialog.Description className="mt-2 text-center text-base text-gray-500">
                    Please create an account to save your teenies to edit/delete
                    them later.
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
                      className="mb-3 focus:border-purple-600 focus:ring-purple-600"
                    />
                    <Button
                      title="Login with Email"
                      className="!m-0 w-full !bg-purple-600 text-base font-normal text-white hover:!bg-purple-900 disabled:opacity-50"
                      disabled={disabled || !isValidEmail(email)}
                      onClick={signInWithEmail}
                    />
                    <Confirm show={showConfirm} email={email ?? ""} />
                    <p className="my-2 text-center text-sm text-gray-400">or</p>
                    {/* Sign with Google */}
                    <button
                      disabled={disabled}
                      onClick={signInWithGoogle}
                      className="mx-auto flex h-[46px] w-full items-center justify-center space-x-2 rounded-md border p-2 text-gray-500 transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                    >
                      <Image
                        src="/google.svg"
                        alt="Google"
                        width={32}
                        height={32}
                      />
                      <span>Sign in with Google</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthModal;
