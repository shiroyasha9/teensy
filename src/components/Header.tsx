import { showAuthModalAtom } from "$store";
import { Popover, Transition } from "@headlessui/react";
import { useSetAtom } from "jotai";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Button from "./Button";
import SocialIcons from "./SocialIcons";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  {
    name: "🤏 Teensy a link",
    href: "/",
  },
  {
    name: "💬 Contactless WhatsApp",
    href: "/wa",
  },
  {
    name: "🔗 My Teensies",
    href: "/teensies",
  },
];

export default function Header() {
  const { data: session } = useSession();
  const setShowAuthModal = useSetAtom(showAuthModalAtom);

  const user = session?.user;

  return (
    <Popover className="relative z-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between  py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/">
              <span className="text-4xl text-lemon-400">teensy</span>
            </Link>
          </div>
          <div className="-my-2 -mr-2 flex items-center md:hidden">
            <ThemeToggle />
            <SocialIcons />
            <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-lemon-400 hover:text-lemon-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lemon-400">
              <span className="sr-only">Open menu</span>
              <HiBars3 className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className=" hover:text-lemon-400"
              >
                {item.name}
              </Link>
            ))}
          </Popover.Group>
          <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <ThemeToggle />
            <SocialIcons />
            <Button
              title={user ? "Logout" : "Login"}
              className="m-0 ml-8 py-1 px-3 text-base"
              onClick={() => (user ? void signOut() : setShowAuthModal(true))}
            />
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-400 rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl text-lemon-400">teensy</span>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-lemon-400">
                    <span className="sr-only">Close menu</span>
                    <HiXMark className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-m-3 flex items-center rounded-md p-3 hover:text-lemon-400"
                    >
                      <span className="ml-3 text-base text-gray-50">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="space-y-6 py-6 px-5">
              <div>
                <Button
                  title={user ? "Logout" : "Login"}
                  className="m-0 w-full border border-transparent px-4 py-2 text-base"
                  onClick={() =>
                    user ? void signOut() : setShowAuthModal(true)
                  }
                />
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
