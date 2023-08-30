"use client";

import { cn } from "@/utils";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const tabButtonClassNames = (
  segment: string | null,
  activePath: "mine" | "analytics",
  className?: string,
) =>
  cn(
    "inline-block w-full px-4 py-2 focus:outline-none",
    {
      "active bg-white text-black dark:bg-gray-600 dark:text-white":
        segment == activePath,
      "bg-gray-300  text-gray-800 dark:bg-gray-800 dark:text-white":
        segment != activePath,
    },
    className,
  );

export default function SelectedSegment() {
  const segment = useSelectedLayoutSegment();
  return (
    <div className="flex divide-x divide-gray-200 rounded-lg text-center text-sm font-medium text-gray-500 shadow dark:divide-gray-700 dark:text-gray-400">
      <div className="w-full">
        <Link
          href="/teensies/mine"
          className={tabButtonClassNames(segment, "mine", "rounded-l-lg")}
        >
          Teensies
        </Link>
      </div>

      <div className="w-full">
        <Link
          href="/teensies/analytics"
          className={tabButtonClassNames(segment, "analytics", "rounded-r-lg")}
        >
          Analytics
        </Link>
      </div>
    </div>
  );
}
