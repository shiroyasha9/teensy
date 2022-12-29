import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";

const MobileHeader = () => {
  const router = useRouter();
  const at = router.asPath;
  return (
    <header className="body-font block md:hidden">
      <div className="container mx-auto flex flex-wrap items-center p-5 ">
        <Link href="/">
          <span className="text-4xl text-lemon-400">teeny</span>
        </Link>
        <nav className="ml-auto mt-0 flex flex-row flex-wrap items-center justify-center text-base">
          <a
            className="mr-5 hover:text-lemon-400"
            href="https://github.com/shiroyasha9/teeny/"
            target="_blank"
            rel="noreferrer"
          >
            <Image src="/github.svg" alt="github icon" width="30" height="30" />
          </a>
        </nav>
        <Button
          variant="primary"
          title="Login"
          className=" m-0 border-0 py-1 px-3 text-base focus:outline-none md:mt-0"
        />
      </div>
      <div className="mt-2 flex items-center justify-center space-x-6">
        {at === "/" ? (
          <Link href={"/wa"} className="hover:text-lemon-400">
            💬 Contactless WhatsApp
          </Link>
        ) : (
          <Link href={"/"} className="hover:text-lemon-400">
            🤏 Teeny a link
          </Link>
        )}
        <a className="hover:text-lemon-400">🔗 My Teeny Links</a>
      </div>
    </header>
  );
};

export default MobileHeader;
