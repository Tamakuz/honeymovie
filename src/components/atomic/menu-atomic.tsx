"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Capitalize, cn } from "@/lib/utils";
import { FiHome } from "react-icons/fi";
import { FaRegCompass } from "react-icons/fa";
import { RiAwardLine } from "react-icons/ri";
import { MdOutlineVerified } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { RiDownloadCloud2Line } from "react-icons/ri";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsGear } from "react-icons/bs";

type MenuProps = {
  menu: string;
  PathnameRoute: string;
};

const MenuAtomic = ({ menu, PathnameRoute }: MenuProps) => {
  const Pathname = usePathname();

  let iconComponent;

  switch (menu) {
    case "home":
      iconComponent = (
        <FiHome
          className={`${
            Pathname === "/" ? "text-primary" : "text-white"
          } text-[18px]`}
        />
      );
      break;
    case "discover":
      iconComponent = (
        <FaRegCompass
          className={`${
            Pathname === "/discover" ? "text-primary" : "text-white"
          } text-[18px]`}
        />
      );
      break;
    case "awards":
      iconComponent = (
        <RiAwardLine
          className={`${
            Pathname === "/awards" ? "text-primary" : "text-white"
          } text-[18px]`}
        />
      );
      break;
    case "celebrities":
      iconComponent = (
        <MdOutlineVerified
          className={`${
            Pathname === "/celebrities" ? "text-primary" : "text-white"
          } text-[18px]`}
        />
      );
      break;
    case "top rated":
      iconComponent = (
        <FaRegStar
          className={`${
            Pathname === "/top-rated" ? "text-primary" : "text-white"
          } text-[18px]`}
        />
      );
      break;
    case "downloaded":
      iconComponent = (
        <RiDownloadCloud2Line
          className={`${
            Pathname === "/downloaded" ? "text-primary" : "text-white"
          } text-[18px]`}
        />
      );
      break;
    case "playlist":
      iconComponent = (
        <IoMdHeartEmpty
          className={`${
            Pathname === "/playlist" ? "text-primary" : "text-white"
          } text-[18px]`}
        />
      );
      break;
    case "setting":
      iconComponent = (
        <BsGear
          className={`${
            Pathname === "/setting" ? "text-primary" : "text-white"
          } text-[18px]`}
        />
      );
      break;
    default:
      iconComponent = null;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-5 cursor-pointer w-[150px]",
        Pathname === PathnameRoute && "border-primary border-r-2"
      )}
    >
      {iconComponent}
      <Link
        href={`${PathnameRoute}`}
        className={`${
          Pathname === PathnameRoute ? "text-primary" : "text-white"
        } text-[15px]`}
        key={PathnameRoute}
      >
        {Capitalize(menu)}
      </Link>
    </div>
  );
};

export default MenuAtomic;
