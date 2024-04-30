import AddVisitCount from "@/components/layout/AddVisitCount";
import Providers from "@/components/layout/Providers";
import { Toaster as ShadcnToast } from "@/components/ui/toaster";
import { cn } from "@/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Rubik } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Confetti from "@/components/layout/Confetti";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import VersionModal from "@/components/version/VersionModal";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";

const APP_NAME = "Teensy";
const APP_DEFAULT_TITLE = "Teensy your URLs";
const APP_TITLE_TEMPLATE = "%s - Teensy";
const APP_DESCRIPTION =
	"A Customizable URL shortener. Paste URL, give it a name, done!";

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_DEFAULT_TITLE,
	},
	formatDetection: {
		telephone: false,
	},
};

const rubik = Rubik({
	subsets: ["latin"],
});

export default function RootLayout({
	children,
	authModal,
}: {
	children: React.ReactNode;
	authModal: React.ReactNode;
}) {
	return (
		<html lang="en" className={cn("antialiased", rubik.className)}>
			<body className="flex h-screen flex-col p-6 md:overflow-x-hidden">
				<Providers>
					<AddVisitCount>
						<Header />
						{authModal}
						<Toaster />
						<section className="mt-12 flex flex-1 flex-col items-center justify-center">
							{children}
						</section>
						<Suspense fallback={null}>
							<Footer />
						</Suspense>
					</AddVisitCount>
					<Confetti />
					<VersionModal />
					<ShadcnToast />
				</Providers>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
