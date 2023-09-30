"use client";

import { NAV_ITEMS } from "@/constants";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import AuthButton from "./AuthButton";

type MobileNavProps = {
  isSignedIn: boolean;
};

const MobileNav = ({ isSignedIn }: MobileNavProps) => {
  return (
    <Popover className="z-20">
      <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-primary hover:text-primary/90 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
        <span className="sr-only">Open menu</span>
        <HiBars3 className="h-6 w-6" aria-hidden="true" />
      </Popover.Button>
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
          {({ close }) => (
            <div className="divide-y-2 divide-gray-400 rounded-lg bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl text-primary">teensy</span>
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
                      <span className="sr-only">Close menu</span>
                      <HiXMark className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    {NAV_ITEMS.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 hover:text-primary"
                        onClick={() => close()}
                      >
                        <span className="ml-3 text-base text-gray-50">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="space-y-6 px-5 py-6">
                <div>
                  <AuthButton isSignedIn={isSignedIn} />
                </div>
              </div>
            </div>
          )}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default MobileNav;
