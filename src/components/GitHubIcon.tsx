import Link from "next/link";
import { AiOutlineGithub } from "react-icons/ai";

export default function GitHubIcon() {
  return (
    <Link href="/gh" target="_blank" rel="noreferrer">
      <AiOutlineGithub className="h-7 w-7" aria-label="teensy github page" />
    </Link>
  );
}
