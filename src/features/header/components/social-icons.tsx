import { appVersion } from "@/constants/config";
import { cn } from "@/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const VsCodeIcon = ({
	className,
	ariaLabel = "vs code icon",
}: { className?: string; ariaLabel?: string }) => {
	return (
		<svg
			viewBox="0 0 32 32"
			xmlns="http://www.w3.org/2000/svg"
			className={cn(
				"size-5 fill-foreground transition-colors duration-500 ease-in hover:fill-primary",
				className,
			)}
			aria-label={ariaLabel}
		>
			<title>VS Code Icon</title>
			<path d="M30.865 3.448l-6.583-3.167c-0.766-0.37-1.677-0.214-2.276 0.385l-12.609 11.505-5.495-4.167c-0.51-0.391-1.229-0.359-1.703 0.073l-1.76 1.604c-0.583 0.526-0.583 1.443-0.005 1.969l4.766 4.349-4.766 4.349c-0.578 0.526-0.578 1.443 0.005 1.969l1.76 1.604c0.479 0.432 1.193 0.464 1.703 0.073l5.495-4.172 12.615 11.51c0.594 0.599 1.505 0.755 2.271 0.385l6.589-3.172c0.693-0.333 1.13-1.031 1.13-1.802v-21.495c0-0.766-0.443-1.469-1.135-1.802zM24.005 23.266l-9.573-7.266 9.573-7.266z" />
		</svg>
	);
};

const PlayStoreIcon = ({
	className,
	ariaLabel = "play store icon",
}: { className?: string; ariaLabel?: string }) => {
	return (
		<svg
			viewBox="0 0 512 512"
			xmlns="http://www.w3.org/2000/svg"
			className={cn(
				"size-5 fill-foreground transition-colors duration-500 ease-in hover:fill-primary",
				className,
			)}
			aria-label={ariaLabel}
		>
			<title>Play Store Icon</title>
			<path d="M48,59.49v393a4.33,4.33,0,0,0,7.37,3.07L260,256,55.37,56.42A4.33,4.33,0,0,0,48,59.49Z" />
			<path d="M345.8,174,89.22,32.64l-.16-.09c-4.42-2.4-8.62,3.58-5,7.06L285.19,231.93Z" />
			<path d="M84.08,472.39c-3.64,3.48.56,9.46,5,7.06l.16-.09L345.8,338l-60.61-57.95Z" />
			<path d="M449.38,231l-71.65-39.46L310.36,256l67.37,64.43L449.38,281C468.87,270.23,468.87,241.77,449.38,231Z" />
		</svg>
	);
};

export default function SocialIcons({ onClick }: { onClick?: () => void }) {
	return (
		<>
			<Link
				href={`/blogs/releases/${appVersion}`}
				className="hover:text-primary"
				onClick={onClick}
			>
				{appVersion}
			</Link>
			<a href="/gh" target="_blank" rel="noreferrer" onClick={onClick}>
				<GitHubLogoIcon
					className="size-6 hover:text-primary"
					aria-label="teensy github page"
				/>
			</a>
			<a href="/vscode" target="_blank" rel="noreferrer" onClick={onClick}>
				<VsCodeIcon ariaLabel="teensy vs code extension" />
			</a>
			<a href="/ps" target="_blank" rel="noreferrer" onClick={onClick}>
				<PlayStoreIcon className="size-6" aria-label="teensy play store app" />
			</a>
		</>
	);
}
