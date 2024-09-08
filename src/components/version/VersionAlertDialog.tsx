"use client";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type VersionAlertDialogProps = {
	backendVersion: string;
};

const VersionAlertDialog = ({ backendVersion }: VersionAlertDialogProps) => {
	const [show, setShow] = useState(false);
	const router = useRouter();

	const handleChangeShowModal = (open: boolean) => {
		setShow(open);
	};

	const handleShowToast = () => {
		toast.error("Revisit it later!", {
			description: `You can always read the blog later by clicking on ${backendVersion} at the top.`,
			action: {
				label: "Read!",
				onClick: () => {
					router.push(`/blogs/releases/${backendVersion}`);
				},
			},
		});
	};

	useEffect(() => {
		const frontendVersion = localStorage.getItem("teensyVersion");
		if (frontendVersion !== backendVersion) {
			setShow(true);
			localStorage.setItem("teensyVersion", backendVersion);
		}
	}, [backendVersion]);

	return (
		<AlertDialog open={show} onOpenChange={handleChangeShowModal}>
			<AlertDialogContent>
				<AlertDialogHeader className="gap-y-3">
					<AlertDialogTitle>
						<span className="text-3xl text-primary">teensy</span> has been
						updated! ❤️🥳
					</AlertDialogTitle>
					<AlertDialogDescription>
						See what&apos;s new in our latest software update on our blog.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="mt-4">
					<AlertDialogCancel onClick={handleShowToast}>
						I&apos;m Loving It Already
					</AlertDialogCancel>
					<AlertDialogAction asChild>
						<Link href={`/blogs/releases/${backendVersion}`}>
							Read The Blog 🔥
						</Link>
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default VersionAlertDialog;
