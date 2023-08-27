"use client";

import { useRouter } from "next/navigation";
import { LuX } from "react-icons/lu";
import type { FC } from "react";
import { Button } from "./ui/button";

const CloseModal: FC = () => {
  const router = useRouter();
  return (
    <Button
      variant="subtle"
      className="h-6 w-6 rounded-md p-0"
      onClick={() => router.back()}
    >
      <LuX aria-label="close modal" className="h-4 w-4" />
    </Button>
  );
};

export default CloseModal;
