import { useSetAtom } from "jotai";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useMediaQuery from "../hooks/useMediaQuery";
import { showAuthModalAtom } from "../stores";
import Button from "./Button";
import MobileHeader from "./MobileHeader";

const Header = () => {
  const router = useRouter();
  const at = router.asPath;
  const isBreakpointReached = useMediaQuery(768);
  const { data: session } = useSession();
  const setShowAuthModal = useSetAtom(showAuthModalAtom);

  const user = session?.user;

  if (isBreakpointReached) return <MobileHeader />;

  return (
    <>
      <header className="body-font hidden md:block">
        <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
          <Link href="/">
            <span className="text-4xl text-lemon-400">teensy</span>
          </Link>
          <nav className="mt-3 flex flex-row flex-wrap items-center justify-center text-base md:ml-auto md:mt-0 md:flex-row">
            {at === "/" ? (
              <Link href={"/wa"} className="mr-0 hover:text-lemon-400 md:mr-5">
                💬 Contactless WhatsApp
              </Link>
            ) : (
              <Link href={"/"} className="mr-0 hover:text-lemon-400 md:mr-5">
                🤏 Teensy a link
              </Link>
            )}
            {user && (
              <Link
                className="mr-0 hover:text-lemon-400 md:mr-5"
                href="/teensies"
              >
                🔗 My Teensies
              </Link>
            )}
            <a
              className="mr-0 hover:text-lemon-400 md:mr-5"
              href="https://github.com/shiroyasha9/teensy/"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/github.svg"
                alt="github icon"
                width="30"
                height="30"
              />
            </a>
          </nav>
          <Button
            variant="primary"
            title={user ? "Logout" : "Login"}
            className=" m-0 border-0 py-1 px-3 text-base focus:outline-none md:mt-0"
            onClick={() => (user ? signOut() : setShowAuthModal(true))}
          />
        </div>
      </header>
    </>
  );
};

export default Header;
