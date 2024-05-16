"use client";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

interface Genre {
  id: number;
  name: string;
}

const SearchAtomic = () => {
  const router = useRouter();
  const params = useSearchParams();

  const changeQuery = (e: React.FormEvent<HTMLInputElement>) => {
    router.push(
      `?category=${params.get("category")}&query=${e.currentTarget.value}`
    );
    if (e.currentTarget.value !== "")
      router.push(
        `/discover?category=${params.get("category")}&query=${
          e.currentTarget.value
        }`
      );
  };

  return (
    <div className="relative">
      <div className="bg-[#21242D] rounded-md flex justify-center items-center px-3 ">
        <CiSearch />
        <Input
          onChange={(e: React.FormEvent<HTMLInputElement>) => changeQuery(e)}
          type="Text"
          placeholder="Search"
          className="bg-[#21242D] w-[300px] h-9 ring-0 focus-visible:ring-offset-0 focus-visible:ring-0 border-none"
        />
        <FaFilter />
      </div>
    </div>
  );
};

export default SearchAtomic;
