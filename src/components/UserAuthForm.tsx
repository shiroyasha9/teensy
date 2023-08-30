"use client";

import { cn } from "@/utils";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

type UserAuthFormProps = {
  className?: string;
};

const UserAuthForm = ({ className }: UserAuthFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = () => {
    toast.loading("Redirecting...");
    setIsLoading(true);
    try {
      void signIn("google", {
        callbackUrl: `${window.location.origin}/`,
      });
    } catch (err) {
      toast.error("There was an error signing in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={signInWithGoogle}
      className={cn(
        "mx-auto flex h-[46px] w-full items-center justify-center space-x-2 rounded-md border p-2 text-white transition-colors hover:border-gray-400 hover:bg-gray-50 hover:text-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-25 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-transparent disabled:hover:text-gray-500 dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600",
        className,
      )}
    >
      <FcGoogle className="h-8 w-8" />
      <span>Sign in with Google</span>
    </button>
  );
};

export default UserAuthForm;
