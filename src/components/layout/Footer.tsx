import { db } from "@/server/db";
import { globalVisits } from "@/server/db/schema";
import Image from "next/image";

export default async function Footer() {
	const visitorsCount = await db.$count(globalVisits);

	return (
		<div className="flex flex-col items-center justify-center pb-4">
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
			<p className="mt-2 font-mono text-xs">{visitorsCount} Unique Visitors</p>
		</div>
	);
}
