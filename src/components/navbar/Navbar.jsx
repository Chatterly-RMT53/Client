import React, { useState } from "react";
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
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { signOut, updateProfile } from "firebase/auth";
import initialize from "@/config/firebase";
import useAuth from "@/hooks/useAuth";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/useToast";

const Navbar = (props) => {
  const { className, hamburgerAction } = props;
  const { auth } = initialize();
  const { user } = useAuth();
  const { toast } = useToast();

  const [username, setUsername] = useState(user.providerData[0]?.displayName);
  const [photoURL, setPhotoURL] = useState(user.providerData[0]?.photoURL);
  const handleSubmit = (e) => {
    e.preventDefault();

    updateProfile(auth.currentUser, {
      displayName: username,
      photoURL,
    }).then(() => {
      toast({
        title: "Success",
        description: "Profile updated",
      });
    });
  };

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
                      <AvatarImage src={user.providerData[0]?.photoURL} />
                      <AvatarFallback>
                        {user.providerData[0]?.displayname || "A"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {!user.isAnonymous && (
                    <DropdownMenuLabel>
                      <Dialog>
                        <DialogTrigger>Profile</DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Profile Setting</DialogTitle>
                            <DialogDescription>
                              <form onSubmit={handleSubmit}>
                                <div className="my-4">
                                  <Label>Username</Label>
                                  <Input
                                    placeholder="Your Username"
                                    value={username}
                                    onChange={(event) =>
                                      setUsername(event.target.value)
                                    }
                                  />
                                </div>
                                <div className="my-4">
                                  <Label>Photo URL</Label>
                                  <Input
                                    placeholder="Your Photo URL"
                                    value={photoURL}
                                    onChange={(event) =>
                                      setPhotoURL(event.target.value)
                                    }
                                  />
                                </div>
                                <div className="mt-8 flex justify-end">
                                  <Button type="submit">Save</Button>
                                </div>
                              </form>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </DropdownMenuLabel>
                  )}
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
