import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useMediaQuery from "../hooks/useMediaQuery";
import Button from "./Button";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const router = useRouter();
  const at = router.asPath;
  const isBreakpointReached = useMediaQuery(768);

  if (isBreakpointReached) return <MobileHeader />;

  return (
    <header className="body-font hidden md:block">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <Link href="/">
          <span className="text-4xl text-lemon-400">teeny</span>
        </Link>
        <nav className="mt-3 flex flex-row flex-wrap items-center justify-center text-base md:ml-auto md:mt-0 md:flex-row">
          {at === "/" ? (
            <Link href={"/wa"} className="mr-0 hover:text-lemon-400 md:mr-5">
              💬 Contactless WhatsApp
            </Link>
          ) : (
            <Link href={"/"} className="mr-0 hover:text-lemon-400 md:mr-5">
              🤏 Teeny a link
            </Link>
          )}
          <a className="mr-0 hover:text-lemon-400 md:mr-5">🔗 My Teeny Links</a>
          <a
            className="mr-0 hover:text-lemon-400 md:mr-5"
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
    </header>
  );
};

export default Header;
