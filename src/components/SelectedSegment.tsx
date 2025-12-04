"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/utils";

const tabButtonClassNames = (
	segment: string | null,
	activePath: "mine" | "analytics",
	className?: string,
) =>
	cn(
		"inline-block w-full px-4 py-2 focus:outline-hidden",
		{
			"active bg-white text-black dark:bg-zinc-600 dark:text-white":
				segment === activePath,
			"bg-zinc-300 text-zinc-800 dark:bg-zinc-800 dark:text-white":
				segment !== activePath,
		},
		className,
	);

export default function SelectedSegment() {
	const segment = useSelectedLayoutSegment();
	return (
		<div className="flex divide-x divide-zinc-200 rounded-lg text-center font-medium text-sm text-zinc-500 shadow-sm dark:divide-zinc-700 dark:text-zinc-400">
			<div className="w-full">
				<Link
					prefetch={false}
					href="/teensies/mine"
					className={tabButtonClassNames(segment, "mine", "rounded-l-lg")}
				>
					Teensies
				</Link>
			</div>

			<div className="w-full">
				<Link
					prefetch={false}
					href="/teensies/analytics"
					className={tabButtonClassNames(segment, "analytics", "rounded-r-lg")}
				>
					Analytics
				</Link>
			</div>
		</div>
	);
}
