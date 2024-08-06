"use client";
import { useEffect, useState } from "react";
import CardMovieReuseble from "@/components/reuseble/card-movie-reuseble";
import SliderComponent from "@/components/slider-component";
import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import useSWR from "swr";
import CardTvReuseble from "@/components/reuseble/card-tv-reuseble";
import { Movie } from "./api/movie/discover/route";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { data: movies , isLoading, error } = useSWR(`/api/movie/discover`, fetcher) as { data: Movie[], error: any, isLoading: boolean };
  console.log(movies);

  if (isLoading)
    return (
      <div className="flex flex-wrap justify-around gap-5">
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-[200px] h-[300px] rounded-xl bg-[#21242D]"
          />
        ))}
      </div>
    );

  return (
    <div className="w-full px-2 overflow-auto space-y-10 scrollbar-none">
      <SliderComponent />
      <div>
        <div className="flex justify-between">
          <h1 className="font-extrabold text-[30px] mb-5">Popular on Movie</h1>
        </div>
        <div className="flex flex-wrap justify-around gap-5">
          {movies.map((mov, index) => (
            <CardMovieReuseble
              key={index}
              selfLink={mov.selfLinkDetail}
              title={mov.title}
              poster_path={mov.imageUrl}
              vote_average={parseFloat(mov.rating)}
              eps={mov.totalEps}
            />
          ))}
        </div>
      </div>
      {error && <div className="w-full text-center">Failed to load data</div>}
    </div>
  );
}

