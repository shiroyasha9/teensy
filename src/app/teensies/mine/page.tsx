import TeensyTable from "@/components/teensies/TeensyTable";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export const metadata = {
	title: "My Teensies",
	description: "Save your teensies to edit/delete them later!",
	keywords: ["url", "shortener", "teensy"],
	metadataBase: new URL("https://teensy.tech"),

	openGraph: {
		images: "/my-teensy-links.png",
		description: "Edit/Delete your saved teensies.",
		type: "website",
		url: "https://teensy.tech/teensies",
	},

	twitter: {
		card: "summary",
		images: "https://teensy.tech/my-teensy-links.png",
	},

	icons: {
		icon: "/icon-192x192.png",
		shortcut: "/favicon.ico",
		apple: "/icon-192x192.png",
	},

	manifest: "/manifest.json",
};

export default async function TeensiesPage() {
	const session = await getServerAuthSession();

	if (!session) {
		redirect("/login");
	}

	const teensies = await db.query.teensy.findMany({
		where: (t, { eq }) => eq(t.ownerId, session.user.id),
		orderBy: (t, { desc }) => desc(t.createdAt),
		with: { visits: true },
	});

	return <TeensyTable userTeensies={teensies} ownerId={session.user.id} />;
}

export const viewport = {
	themeColor: "#712fb9",
};
