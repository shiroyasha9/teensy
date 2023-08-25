"use client";

import { cn } from "@/utils";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

type AuthButtonProps = {
  isSignedIn: boolean;
};

const AuthButton = ({ isSignedIn }: AuthButtonProps) => {
  if (isSignedIn) {
    return (
      <Button
        className="m-0 h-auto w-full px-4 py-2 text-base font-semibold md:ml-8 md:w-auto md:px-3 md:py-1"
        onClick={() => {
          void signOut({
            callbackUrl: `${window.location.origin}/login`,
          });
        }}
      >
        Logout
      </Button>
    );
  }

  return (
    <Link
      href="/login"
      className={cn(
        buttonVariants(),
        "m-0 h-auto w-full px-4 py-2 text-base font-semibold md:ml-8 md:w-auto md:px-3 md:py-1",
      )}
    >
      Login
    </Link>
  );
};

export default AuthButton;
