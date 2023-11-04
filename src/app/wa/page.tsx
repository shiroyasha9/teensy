import WhatsAppForm from "@/components/wa/WhatsAppForm";

export const metadata = {
  title: "Contactless Whatsapp",
  description: "No more saving unwanted contacts!",
  keywords: ["whatsapp", "contactless", "teensy"],
  metadataBase: new URL("https://teensy.tech"),

  openGraph: {
    images: "/wa.png",
    description: "No more saving unwanted contacts!",
    type: "website",
    url: "https://teensy.tech/wa",
  },

  twitter: {
    card: "summary_large_image",
    images: "https://teensy.tech/wa.png",
  },

  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💬</text></svg>",
  },
};

export default function WhatsAppPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h1 className="text-center text-2xl sm:text-xl">
        Want to WhatsApp someone without saving their number?
      </h1>
      <WhatsAppForm />
      <p className="text-center">
        <span>you will be redirected to a page, click on</span>{" "}
        <span className="text-primary">Continue to chat</span>
      </p>
    </div>
  );
}
