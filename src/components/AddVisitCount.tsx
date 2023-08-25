"use client";

import { trpc } from "@/app/_trpc/client";
import { isDevEnvironment } from "@/utils/functions";
import { useEffect } from "react";

type AddVisitCountProps = {
  children: React.ReactNode;
};

export default function AddVisitCount({ children }: AddVisitCountProps) {
  const addGlobalVisitCount = trpc.addGlobalVisit.useMutation();

  useEffect(() => {
    if (window.sessionStorage && !isDevEnvironment) {
      const isVisited = sessionStorage.getItem("isVisited");
      if (!isVisited) {
        addGlobalVisitCount.mutate();
        sessionStorage.setItem("isVisited", "true");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
