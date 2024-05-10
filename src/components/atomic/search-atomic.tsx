"use client";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

interface Genre {
  id: number;
  name: string;
}

const SearchAtomic = () => {
  const params = useSearchParams();

  const changeQuery = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    
    // changeQueryParams("query", e.currentTarget.value.replace(/ /g, "+"));
  };

  return (
    <div className="relative">
      <div className="bg-[#21242D] rounded-md flex justify-center items-center px-3 ">
        <CiSearch />
        <Input
          onChange={(e : React.FormEvent<HTMLInputElement>) => changeQuery(e)}
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
