"use client";
import { fetcher } from "@/lib/utils";
import {
  RecomendationsMovieResponse,
  VideoResultRecomendation,
} from "@/types/recomendation-movie";
import React from "react";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";
import CardMovieReuseble from "../reuseble/card-movie-reuseble";

const RecomendationMovieAtomic = ({ idMovie }: { idMovie: string }) => {
  const {
    data: dataVIdeoMovie,
    isLoading,
  }: { data: RecomendationsMovieResponse; isLoading: boolean } = useSWR(
    `https://api.themoviedb.org/3/movie/${idMovie}/recommendations?api_key=${process
      .env.NEXT_PUBLIC_APIKEY_TMDB!}`,
    fetcher
  );

  console.log(dataVIdeoMovie);

  if (isLoading)
    return (
      <div className="grid grid-cols-7 gap-3 rounded-xl h-fit">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton
            key={index}
            className="rounded-2xl h-[200px] w-full bg-[#21242D]"
          />
        ))}
      </div>
    );

  return (
    <div className="space-y-3 pb-5">
      <h2 className="text-2xl font-bold">Recomendations</h2>
      <div className="grid grid-cols-5 gap-3">
        {dataVIdeoMovie?.results
          ?.slice(0, 5)
          .map((video: VideoResultRecomendation, index: number) => (
            <CardMovieReuseble
              key={index}
              idMovie={video.id}
              title={video.title}
              poster_path={video.poster_path}
              vote_average={video.vote_average}
            />
          ))}
      </div>
    </div>
  );
};

export default RecomendationMovieAtomic;
