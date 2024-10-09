import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Separator } from "../ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { signOut } from "firebase/auth";
import initialize from "@/config/firebase";
import useAuth from "@/hooks/useAuth";

const Navbar = (props) => {
  const { className, hamburgerAction } = props;
  const { auth } = initialize();
  const { user } = useAuth();

  return (
    <div className={className}>
      <nav className={`w-full py-4`}>
        <div className="container mx-auto">
          <div className="mx-auto flex items-center justify-between">
            <div>
              <Button className="block md:hidden" onClick={hamburgerAction}>
                <HamburgerMenuIcon />
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex items-center space-x-4">
                    <p>
                      {user.providerData[0]?.displayName ||
                        `anonymous-${user.uid.slice(0, 5)}`}
                    </p>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel
                    className="cursor-pointer"
                    onClick={() => signOut(auth)}
                  >
                    Logout
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
      <Separator className="mb-16" />
    </div>
  );
};

export default Navbar;
