"use client";

import { usePathname } from "next/navigation";
import ReactDomConfetti from "react-dom-confetti";

const config = {
	angle: 90,
	spread: 176,
	startVelocity: 30,
	elementCount: 133,
	dragFriction: 0.07,
	duration: 3000,
	stagger: 3,
	width: "10px",
	height: "10px",
	perspective: "500px",
	colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const Confetti = () => {
	const pathname = usePathname();

	return (
		<div className="-z-10 absolute top-0 left-0 h-screen w-screen overflow-hidden">
			<div className="h-screen w-screen translate-x-1/2 translate-y-1/3">
				<ReactDomConfetti active={pathname === "/success"} config={config} />
			</div>
		</div>
	);
};

export default Confetti;
