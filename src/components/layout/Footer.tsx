import { db } from "@/server/db";
import { globalVisits } from "@/server/db/schema";
import Image from "next/image";
import { Suspense } from "react";

const VisitorCount = async () => {
	const visitorsCount = await db.$count(globalVisits);

	return <p>{visitorsCount} Unique Visitors</p>;
};

export default function Footer() {
	return (
		<div className="flex flex-col items-center justify-center pb-4 gap-3 text-xs font-mono">
			<a
				href="https://www.buymeacoffee.com/mubinansari"
				target="_blank"
				rel="noreferrer"
			>
				<Image
					src="/bmc.svg"
					alt="buy me a coffee icon"
					width={545 * 0.25}
					height={153 * 0.25}
					priority
				/>
			</a>
			<Suspense fallback={<p>Loading Unique Visitors</p>}>
				<VisitorCount />
			</Suspense>
		</div>
	);
}
