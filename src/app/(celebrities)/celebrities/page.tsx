"use client";
import CardPersonReuseble from "@/components/reuseble/card-person-reuseble";
import { Input } from "@/components/ui/input";
import { cn, fetcher } from "@/lib/utils";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import useSWR from "swr";

const CelebritiesPage = () => {
  const [inputCelebrity, setInputCelebrity] = useState<string>("");

  const changeQuery = (e: React.FormEvent<HTMLInputElement>) => {
    setInputCelebrity(e.currentTarget.value);
  };

  const { data: dataCelebrities, isLoading } = useSWR(
    `https://api.themoviedb.org/3/search/person?query=${inputCelebrity}&api_key=${process
      .env.NEXT_PUBLIC_APIKEY_TMDB!}`,
    fetcher
  );

  console.log(dataCelebrities);
  

  return (
    <div className="flex flex-col w-full overflow-auto scrollbar-none pb-5">
      <div
        className={cn(
          "h-10 w-full flex my-5",
          inputCelebrity === "" ? "justify-center" : "justify-start"
        )}
      >
        <div className="bg-[#21242D] rounded-md flex justify-center items-center px-3 ">
          <CiSearch />
          <Input
            onChange={(e: React.FormEvent<HTMLInputElement>) => changeQuery(e)}
            type="Text"
            placeholder="Find your celebrity"
            className="bg-[#21242D] w-[300px] h-9 ring-0 focus-visible:ring-offset-0 focus-visible:ring-0 border-none"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-around gap-5">
        {isLoading && <p>Loading...</p>}
        {dataCelebrities &&
          dataCelebrities.results.map((celebrity: any, index: any) => (
            <CardPersonReuseble
              key={index}
              name={celebrity.name}
              known_for_department={celebrity.known_for_department}
              poster={celebrity.profile_path}
            />
          ))}
      </div>
    </div>
  );
};

export default CelebritiesPage;
