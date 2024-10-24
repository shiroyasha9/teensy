"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import type { FC } from "react";
import { Button } from "./ui/button";

const CloseModal: FC = () => {
	const router = useRouter();
	return (
		<Button variant="ghost" size="icon" onClick={() => router.back()}>
			<Cross1Icon aria-label="close modal" className="size-4" />
		</Button>
	);
};

export default CloseModal;
