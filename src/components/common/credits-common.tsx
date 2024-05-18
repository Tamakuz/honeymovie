"use client";
import { fetcher } from "@/lib/utils";
import { MovieResponse } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import useSWR from "swr";

const CreditsCommon = ({ idMovie }: { idMovie: string }) => {
  const {
    data: dataDetailMovie,
    isLoading,
  }: { data: MovieResponse; isLoading: boolean } = useSWR(
    `https://api.themoviedb.org/3/movie/${idMovie}?api_key=${process.env
      .NEXT_PUBLIC_APIKEY_TMDB!}`,
    fetcher
  );

  console.log(dataDetailMovie);

  if (isLoading)
    return (
      <div className="h-[150px] w-full flex justify-center items-center gap-3">
        Loading...
      </div>
    );

  return (
    <div className="w-full overflow-auto scrollbar-none">
      <div className="h-[150px] w-full flex items-center gap-5">
        <Image
          src={`https://image.tmdb.org/t/p/w500${dataDetailMovie?.poster_path}`}
          alt="poster"
          width={60}
          height={150}
          className="rounded-md"
        />
        <div>
          <h1 className="text-4xl font-bold">{dataDetailMovie?.title}</h1>
          <Link
            href={`/${idMovie}/movie`}
            className="text-primary hover:underline flex gap-2 items-center"
          >
            <IoIosArrowBack />
            Back to main
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 bg-red-500">
        <div>1</div>
        <div>2</div>
      </div>
    </div>
  );
};

export default CreditsCommon;
