"use client";

import { cn, fetcher } from "@/lib/utils";
import { MovieResponse } from "@/types/movie";
import Link from "next/link";
import React, { useState } from "react";
import useSWR from "swr";
import { Skeleton } from "../ui/skeleton";
import { VideoMovieResponse, VideoMovieType } from "@/types/video-movie";
import { ImageObjectMovie, ImagesMovieResponse } from "@/types/image-movie";
import Image from "next/image";

const MediaMovieAtomic = ({ idMovie }: { idMovie: string }) => {
  const [tab, setTab] = useState<string>("videos");

  const {
    data: dataVIdeoMovie,
    isLoading,
  }: { data: VideoMovieResponse; isLoading: boolean } = useSWR(
    `https://api.themoviedb.org/3/movie/${idMovie}/videos?api_key=${process.env
      .NEXT_PUBLIC_APIKEY_TMDB!}`,
    fetcher
    );
  
  const { data: dataImagesMovie }: { data: ImagesMovieResponse } = useSWR(
    `https://api.themoviedb.org/3/movie/${idMovie}/images?api_key=${process.env
      .NEXT_PUBLIC_APIKEY_TMDB!}`,
    fetcher
  );

  if (isLoading) {
    return <Skeleton className="rounded-2xl h-[450px] w-full bg-[#21242D]" />;
  }

  return (
    <div className="space-y-3 pb-5">
      <div className="flex justify-between items-center gap-10">
        <h2 className="text-2xl font-bold">Media</h2>
        <div className="flex items-center gap-3 grow">
          <span
            onClick={() => setTab("videos")}
            className={cn(
              tab === "videos" && "border-b-2 border-primary",
              "cursor-pointer"
            )}
          >
            Videos
          </span>
          <span
            onClick={() => setTab("backdrops")}
            className={cn(
              tab === "backdrops" && "border-b-2 border-primary",
              "cursor-pointer"
            )}
          >
            Backdrops
          </span>
          <span
            onClick={() => setTab("posters")}
            className={cn(
              tab === "posters" && "border-b-2 border-primary",
              "cursor-pointer"
            )}
          >
            Posters
          </span>
        </div>
        <div>
          <Link
            href={`/${idMovie}/movie/${tab}`}
            className="cursor-pointer text-primary"
          >
            View all {tab}
          </Link>
        </div>
      </div>
      <div className={`grid grid-cols-${tab === "posters" ? 5 : 2} gap-3`}>
        {tab === "videos" &&
          dataVIdeoMovie?.results
            .slice(0, 2)
            .map((video: VideoMovieType, index: number) => (
              <div key={index}>
                <iframe
                  className="w-full aspect-video rounded-2xl"
                  src={`https://www.youtube.com/embed/${video.key}`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            ))}
        {tab === "backdrops" &&
          dataImagesMovie.backdrops
            .slice(0, 2)
            .map((image: ImageObjectMovie, index: number) => (
              <Image
                key={index}
                src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                alt={image.file_path}
                width={600}
                height={200}
                className="w-full aspect-video rounded-2xl"
              />
            ))}
        {tab === "posters" &&
          dataImagesMovie.posters
            .slice(0, 5)
            .map((image: ImageObjectMovie, index: number) => (
              <Image
                key={index}
                src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                alt={image.file_path}
                width={600}
                height={500}
                className="w-full h-full rounded-2xl"
              />
            ))}
      </div>
    </div>
  );
};

export default MediaMovieAtomic;
