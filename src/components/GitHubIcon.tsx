import Image from "next/image";
import Link from "next/link";

export default function GitHubIcon() {
  return (
    <Link href="/gh" target="_blank" rel="noreferrer">
      <Image src="/github.svg" alt="github icon" width="30" height="30" />
    </Link>
  );
}
