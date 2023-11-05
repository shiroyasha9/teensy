import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { NAV_ITEMS } from "@/constants";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import AuthButton from "./AuthButton";

type MobileHeaderProps = {
  isSignedIn: boolean;
};

const MobileHeader = ({ isSignedIn }: MobileHeaderProps) => {
  return (
    <Menubar className="border-none bg-transparent">
      <MenubarMenu>
        <MenubarTrigger>
          <HamburgerMenuIcon className="h-6 w-6" aria-hidden="true" />
        </MenubarTrigger>
        <MenubarContent align="end">
          {NAV_ITEMS.map((item) => (
            <MenubarItem key={item.name} asChild>
              <Link href={item.href}>
                <p>{item.name}</p>
              </Link>
            </MenubarItem>
          ))}
          <MenubarSeparator />
          <MenubarItem>
            <AuthButton isSignedIn={isSignedIn} />
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default MobileHeader;
