import TeensyTable from "@/components/teensies/TeensyTable";
import { getAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Teensies",
  description: "Save your teensies to edit/delete them later!",
  keywords: ["url", "shortener", "teensy"],
  openGraph: {
    images: "https://teensy.tech/my-teensy-links.png",
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
  themeColor: "#712fb9",
  manifest: "/manifest.json",
};

export default async function TeensiesPage() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const teensies = await db.teensy.findMany({
    where: { owner: { email: session.user.email } },
    orderBy: { createdAt: "desc" },
    include: { visits: true },
  });

  return <TeensyTable userTeensies={teensies} />;
}
