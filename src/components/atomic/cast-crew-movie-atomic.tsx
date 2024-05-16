"use client";
import { fetcher } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUser } from "react-icons/fa";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";

const CastCrewMovieAtomic = ({ idMovie }: { idMovie: string }) => {
  const { data: dataCredits, isLoading } = useSWR(
    `https://api.themoviedb.org/3/movie/${idMovie}}/credits?api_key=${process
      .env.NEXT_PUBLIC_APIKEY_TMDB!}`,
    fetcher
  );

  if (isLoading)
    return (
      <div className="grid grid-cols-7 gap-3 rounded-xl h-fit">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} className="rounded-2xl h-[200px] w-full bg-[#21242D]" />
        ))}
      </div>
    );

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Top Cast</h2>
        <Link
          href={`/${idMovie}/movie/credits`}
          className="text-primary hover:underline"
        >
          Full Cast & Crew
        </Link>
      </div>
      <div className="grid grid-cols-7 gap-3 rounded-xl h-fit">
        {dataCredits?.cast?.slice(0, 7).map((credit: any, index: number) => (
          <div key={index} className="bg-secondary-foreground">
            {credit?.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${credit?.profile_path}`}
                alt={credit?.name}
                width={150}
                height={200}
                key={index}
                className="rounded-t-xl w-full"
              />
            ) : (
              <div className="flex items-center justify-center bg-gray-200 rounded-t-xl w-full h-[234px]">
                <FaUser className="text-6xl text-gray-500" />
              </div>
            )}
            <div className="p-2">
              <h2 className="font-semibold text-primary">{credit?.name}</h2>
              <p className="text-sm">{credit?.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CastCrewMovieAtomic;
