"use client";
import React, { useEffect, useState } from "react";
import BrandImage from "../../../public/brand.svg";
import Image from "next/image";
import ListBarAtmoic from "../atomic/listbar-atomic";
import SearchAtomic from "../atomic/search-atomic";
import ProfileAtomic from "../atomic/profile-atomic";
import { MdMovie } from "react-icons/md";
import { PiTelevisionBold } from "react-icons/pi";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const NavReuseble = () => {
  return (
    <>
      <NavDesktop />
      <NavMobile />
    </>
  );
};

const NavDesktop = () => {
  return (
    <div className="hidden md:flex container h-[100px]  items-center gap-5">
      <div>
        <Image
          src={BrandImage}
          alt="brand"
          width={200}
          height={100}
          priority
        />
      </div>
      <ListBarAtmoic />
      <SearchAtomic />
      <ProfileAtomic />
    </div>
  );
};

const NavMobile = () => {
  const router = useRouter();
  const CurrentPathname = usePathname();
  const [prevPathName, setPrevPathName] = useState<string>("/");
  const [category, setCategory] = useState<"movie" | "tvshow">("movie");

  useEffect(() => {
    if (CurrentPathname !== prevPathName) {
      router.push(`${CurrentPathname}?category=${category}`);
      setPrevPathName(CurrentPathname);
    } else {
      router.push(`?category=${category}`);
    }
  }, [CurrentPathname, prevPathName, category, router]);

  return (
    <div className="fixed bottom-0 z-[999] flex justify-around md:hidden container h-fit  items-center gap-5 py-2 rounded-t-xl bg-primary">
      <div className="flex flex-col items-center gap-1">
        <div
          onClick={() => setCategory("movie")}
          className={cn(
            "hover:bg-foreground p-2 rounded-full h-fit w-fit",
            category === "movie" && "bg-foreground"
          )}
        >
          <MdMovie
            className={cn(
              "h-5 w-5 text-foreground hover:text-primary",
              category === "movie" && "text-primary"
            )}
          />
        </div>
        <p className="text-xs">Movie</p>
      </div>
      <div onClick={() => setCategory("tvshow")} className="flex flex-col items-center gap-1">
        <div
          className={cn(
            "hover:bg-foreground p-2 rounded-full h-fit w-fit",
            category === "tvshow" && "bg-foreground"
          )}
        >
          <PiTelevisionBold
            className={cn(
              "h-5 w-5 text-foreground hover:text-primary",
              category === "tvshow" && "text-primary"
            )}
          />
        </div>
        <p className="text-xs">Tv</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <ProfileAtomic />
        <p className="text-xs">Profil</p>
      </div>
    </div>
  );
};

export default NavReuseble;
