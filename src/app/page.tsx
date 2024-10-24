import TeensyForm from "@/components/TeensyForm";
import { auth } from "@/server/auth";
import type { Viewport } from "next";
import Link from "next/link";

export const metadata = {
	title: "Teensy your URLs",
	description: "A Customizable URL shortener. Paste URL, give it a name, done!",
	keywords: ["url", "shortener", "teensy"],
	metadataBase: new URL("https://teensy.tech"),

	openGraph: {
		images: "/teensy.png",
		description:
			"A Customizable URL shortener. Paste URL, give it a name, done!",
		type: "website",
		url: "https://teensy.tech/",
	},

	twitter: {
		card: "summary",
		images: "https://teensy.tech/teensy.png",
	},

	icons: {
		icon: "/icon-192x192.png",
		shortcut: "/favicon.ico",
		apple: "/icon-192x192.png",
	},

	manifest: "/manifest.json",
};

export const viewport: Viewport = {
	themeColor: "#712fb9",
};

const Page = async () => {
	const session = await auth();

	return (
		<>
			<TeensyForm ownerId={session?.user.id} />
			{!session?.user && (
				<p className="text-center text-sm">
					<Link
						href="/login"
						className="font-semibold text-primary hover:text-primary/90"
					>
						Login
					</Link>{" "}
					to save this teensy to edit/delete it later.
				</p>
			)}
		</>
	);
};

export default Page;
