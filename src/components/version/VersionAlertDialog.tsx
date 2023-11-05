"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

type VersionAlertDialogProps = {
  backendVersion: string;
};

const VersionAlertDialog = ({ backendVersion }: VersionAlertDialogProps) => {
  const [show, setShow] = useState(false);
  const { toast } = useToast();

  const handleChangeShowModal = (open: boolean) => {
    setShow(open);
  };

  const handleShowToast = () => {
    toast({
      variant: "destructive",
      title: `Revisit it later!`,
      description: `You can always read the blog later by clicking on ${backendVersion} at the top.`,
      action: (
        <ToastAction altText="Read!" asChild>
          <Link
            href={`/blogs/releases/${backendVersion}`}
            className="rounded border border-zinc-300 px-2 py-1"
          >
            Read!
          </Link>
        </ToastAction>
      ),
    });
  };

  useEffect(() => {
    const frontendVersion = localStorage.getItem("teensyVersion");
    if (frontendVersion !== backendVersion) {
      setShow(true);
      localStorage.setItem("teensyVersion", backendVersion);
    }
  }, [backendVersion]);

  return (
    <AlertDialog open={show} onOpenChange={handleChangeShowModal}>
      <AlertDialogContent>
        <AlertDialogHeader className="gap-y-3">
          <AlertDialogTitle>
            <span className="text-3xl text-primary">teensy</span> has been
            updated! ❤️🥳
          </AlertDialogTitle>
          <AlertDialogDescription>
            See what&apos;s new in our latest software update on our blog.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel onClick={handleShowToast}>
            I&apos;m Loving It Already
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Link href={`/blogs/releases/${backendVersion}`}>
              Read The Blog 🔥
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default VersionAlertDialog;
