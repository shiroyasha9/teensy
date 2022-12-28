import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Footer() {
  const router = useRouter();
  const at = router.asPath;
  return (
    <div className="m-6 flex w-screen basis-2/12 flex-col justify-center gap-5  p-6 ">
      <div className="justify-center">
        {at === "/" ? (
          <Link href={"/wa"}>
            <button className="w-full">
              💬 Text on WhatsApp without saving number
            </button>
          </Link>
        ) : (
          <Link href={"/"}>
            <button className="w-full">🤏 Teeny a link</button>
          </Link>
        )}
      </div>
      <div className="flex justify-center gap-10">
        <a
          href="https://github.com/shiroyasha9/teeny/"
          target="_blank"
          rel="noreferrer"
        >
          <div className="flex cursor-pointer">
            <Image
              src="/github.svg"
              alt="github icon"
              width="16"
              height="16"
              className="mr-1"
            />
            Github
          </div>
        </a>
        <a
          href="https://www.buymeacoffee.com/mubinansari"
          target="_blank"
          rel="noreferrer"
        >
          <div className="cursor-pointer">☕ Buy me a coffee</div>
        </a>
      </div>
    </div>
  );
}
