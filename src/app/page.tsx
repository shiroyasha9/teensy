import TeensyForm from "@/components/TeensyForm";
import { getAuthSession } from "@/server/auth";
import Link from "next/link";

export const metadata = {
  title: "Teensy your URLs",
  description: "A Customizable URL shortener. Paste URL, give it a name, done!",
  keywords: ["url", "shortener", "teensy"],
  openGraph: {
    images: "https://teensy.tech/teensy.png",
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
  themeColor: "#712fb9",
  manifest: "/manifest.json",
};

const Page = async () => {
  const session = await getAuthSession();

  return (
    <>
      <TeensyForm ownerId={session?.user.id} />
      {!session?.user && (
        <p className="text-center text-sm">
          <Link
            href="/login"
            className="font-semibold text-lemon-400 hover:text-lemon-200"
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
