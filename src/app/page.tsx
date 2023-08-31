import Home from "@/components/Home";

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

const Page = () => {
  return <Home />;
};

export default Page;
