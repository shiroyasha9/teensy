"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

type Props = {
	backendVersion: string;
};

export default function VersionUpdateToast({ backendVersion }: Props) {
	const router = useRouter();

	useEffect(() => {
		const frontendVersion = localStorage.getItem("teensyVersion");
		if (frontendVersion !== backendVersion) {
			localStorage.setItem("teensyVersion", backendVersion);

			const timeoutId = setTimeout(() => {
				toast.success("Teensy has been updated!", {
					description: `See what's new in this version`,
					action: {
						label: "Read",
						onClick: () => {
							router.push(`/blogs/releases/${backendVersion}`);
						},
					},
				});
			}, 500);

			return () => clearTimeout(timeoutId);
		}
	}, [backendVersion, router.push]);

	return null;
}
