import PasswordForm from "@/components/protected/PasswordForm";
import { db } from "@/server/db";
import type { Viewport } from "next";
import { notFound } from "next/navigation";

export const metadata = {
	title: "Protected Teensy",
	description: "A Customizable URL shortener. Paste URL, give it a name, done!",
	keywords: ["url", "shortener", "teensy", "protected"],
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

type ProtectedTeensyPageProps = {
	searchParams: Promise<{
		slug: string;
	}>;
};

export default async function Page({ searchParams }: ProtectedTeensyPageProps) {
	const { slug } = await searchParams;
	const teensy = await db.query.teensy.findFirst({
		where: (t, { eq }) => eq(t.slug, slug),
	});

	if (!teensy) {
		return notFound();
	}

	return (
		<div className="flex flex-col items-center justify-center gap-10">
			<h1 className="text-center text-2xl sm:text-xl">
				This link is protected
			</h1>
			<PasswordForm teensy={teensy} />
		</div>
	);
}
