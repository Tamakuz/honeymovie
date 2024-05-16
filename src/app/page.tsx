"use client";
import { useState } from "react";
import CardMovieReuseble from "@/components/reuseble/card-movie-reuseble";
import SliderComponent from "@/components/slider-component";
import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import useSWR from "swr";
import CardTvReuseble from "@/components/reuseble/card-tv-reuseble";

export default function Home() {
  const params = useSearchParams();
  const currentParamsQuery = params.get("category");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading } = useSWR(() => {
    switch (currentParamsQuery) {
      case "movie":
        return `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=${process
          .env.NEXT_PUBLIC_APIKEY_TMDB!}`;
      case "tvshow":
        return `https://api.themoviedb.org/3/tv/popular?page=${page}&api_key=${process
          .env.NEXT_PUBLIC_APIKEY_TMDB!}`;
      default:
        break;
    }
  }, fetcher);

  return (
    <div className="w-full px-2 overflow-auto space-y-10 scrollbar-none">
      <SliderComponent />
      <div>
        <div className="flex justify-between">
          <h1 className="font-extrabold text-[30px] mb-5">Popular on Movie</h1>
          <div className="flex items-center gap-5">
            <Button
              size={"icon"}
              onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
            >
              <FaArrowLeft />
            </Button>
            <span className="w-[30px] text-center">{page}</span>
            <Button size={"icon"} onClick={() => setPage((prev) => prev + 1)}>
              <FaArrowRight />
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap justify-around gap-5">
          {isLoading
            ? Array.from({ length: 20 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-[200px] h-[300px] rounded-xl bg-[#21242D]"
                />
              ))
            : data?.results?.map((mov: any, index: any) =>
                currentParamsQuery === "movie" ? (
                  <CardMovieReuseble
                    idMovie={mov.id}
                    title={mov.title}
                    poster_path={mov.poster_path}
                    vote_average={mov.vote_average}
                    key={index}
                  />
                ) : (
                  <CardTvReuseble
                    idTv={mov.id}
                    title={mov.title}
                    poster_path={mov.poster_path}
                    vote_average={mov.vote_average}
                    key={index}
                  />
                )
              )}
        </div>
      </div>
    </div>
  );
}

