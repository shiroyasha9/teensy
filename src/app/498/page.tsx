import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ExpiredTeensy() {
	return (
		<main className="flex flex-col items-center justify-center">
			<h1 className="mb-3 font-bold text-9xl">498</h1>
			<p className="text-center">
				teensy link has expired, contact the owner, create this teensy or
			</p>
			<Link href="/">
				<Button>Go back to home page 🏠</Button>
			</Link>
		</main>
	);
}
