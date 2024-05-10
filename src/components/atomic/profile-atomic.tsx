"use client";
import React from "react";
import { FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaGithub } from "react-icons/fa6";

const ProfileAtomic = () => {
  const { data: session } = useSession();

  const login = false;
  return (
    <DropdownMenu>
      <Button
        asChild
        variant="outline"
        size="sm"
        className="bg-[#21242D] hover:bg-[#21242D] hover:text-white border-none p-0"
      >
        <DropdownMenuTrigger className="border-none">
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              alt=""
              width={32}
              height={32}
              className="h-full w-full rounded-md"
            />
          ) : (
            <FaUser className="h-4 w-4 mx-3" />
          )}
        </DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent className="bg-[#21242D] text-white border-none p-3 space-y-3">
        {/* <DropdownMenuItem className="cursor-pointer">
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem> */}
        <Button
          variant="ghost"
          disabled={!session}
          className="cursor-pointer w-full"
        >
          Profile
        </Button>
        {session !== null ? (
          <Button
            onClick={() => session && signOut()}
            className="cursor-pointer w-full"
          >
            Sign Out
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className={(cn(session && "hidden"), "cursor-pointer w-full")}
              >
                Login
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#21242D] border-none">
              <DialogHeader>
                <DialogTitle>Login</DialogTitle>
                <DialogDescription>
                  Login dulu bang baru lanjut
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col justify-center items-center py-5 gap-3">
                <div
                  onClick={() => signIn("google")}
                  className="flex items-center gap-3 bg-primary px-5 py-3 rounded-full cursor-pointer"
                >
                  <FcGoogle className="text-2xl" />
                  <span className="text-[#21242D]">Login with Google</span>
                </div>
                <div
                  onClick={() => signIn("github")}
                  className="flex items-center gap-3 bg-primary px-5 py-3 rounded-full cursor-pointer"
                >
                  <FaGithub className="text-2xl text-black" />
                  <span className="text-[#21242D]">Login with Github</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAtomic;
