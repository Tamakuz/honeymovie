"use client"
import { MovieResponse } from '@/types/movie';
import React from 'react'
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { FaList } from "react-icons/fa6";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { FaBookmark, FaHeart, FaPlay } from "react-icons/fa";
import Image from 'next/image';
import { fetcher } from '@/lib/utils';
import useSWR from 'swr';
import { Skeleton } from '../ui/skeleton';

const HeroMovieAtomic = ({idMovie} : { idMovie: string }) => {
  const {
    data: dataMovie,
    isLoading,
  }: { data: MovieResponse; isLoading: boolean } = useSWR(
    `https://api.themoviedb.org/3/movie/${idMovie}?api_key=${process.env
      .NEXT_PUBLIC_APIKEY_TMDB!}`,
    fetcher
    );
  
  if (isLoading) {
    return <Skeleton className="rounded-2xl h-[450px] w-full bg-[#21242D]" />;
  } else {
    return (
      <div
        className="rounded-2xl h-fit w-full bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${dataMovie?.backdrop_path})`,
        }}
      >
        <div className="w-full h-fit bg-red p-3 flex gap-5 backdrop-brightness-50">
          <div className="w-[400px] h-fit">
            <Image
              src={`https://image.tmdb.org/t/p/w500${dataMovie?.poster_path}`}
              width={300}
              height={500}
              alt={dataMovie?.title}
              className="rounded-xl shadow-md"
            />
          </div>
          <div className="w-full">
            <h1 className="text-4xl font-bold">
              {dataMovie?.title}{" "}
              <span className="text-gray-300 text-normal">
                ({dataMovie?.release_date.slice(0, 4)})
              </span>
            </h1>
            <div className="flex gap-2 my-2">
              <h2>{dataMovie?.release_date}</h2>
              {dataMovie?.genres?.map((genre: any) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
            </div>
            <div className="flex gap-2 my-5">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size={"icon"}>
                      <FaList />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to list</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size={"icon"}>
                      <FaHeart />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mark as favorite</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size={"icon"}>
                      <FaBookmark />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to your watchlist</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button
                className="hover:bg-transparent hover:text-white"
                variant="ghost"
              >
                <FaPlay className="mr-2" /> Play Trailer
              </Button>
            </div>
            <div>
              <h3 className="italic text-gray-300">{dataMovie.tagline}</h3>
              <h2 className="text-2xl font-bold mt-3">Overview</h2>
              <p>{dataMovie.overview}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 my-5">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Original language</h3>
                {dataMovie?.spoken_languages?.map(
                  (language: any, index: number) => (
                    <p key={index} className="text-sm">
                      {language.name}
                    </p>
                  )
                )}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Budget</h3>
                <p className="text-sm">
                  {dataMovie?.budget.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold">Revenue</h3>
                <p className="text-sm">
                  {dataMovie?.revenue.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default HeroMovieAtomic