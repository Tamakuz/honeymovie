"use client";
import { useEffect, useState } from "react";
import CardMovieReuseble from "@/components/reuseble/card-movie-reuseble";
import SliderComponent from "@/components/slider-component";
import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/lib/utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function Home() {
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const currentParamsQuery = params.get("category");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    // Fetch new data when currentParamsQuery changes
    const fetchData = async () => {
      switch (currentParamsQuery) {
        case "movie":
          await queryClient.prefetchQuery({
            queryKey: ["popular"],
            queryFn: () => fetcher("/movie/popular", page),
          });
          break;
        case "tvshow":
          await queryClient.prefetchQuery({
            queryKey: ["popular"],
            queryFn: () => fetcher("/tv/popular", page),
          });
          break;
        default:
          break;
      }
    };

    if (currentParamsQuery) {
      fetchData();
    }
  }, [currentParamsQuery, queryClient, page]);

  const { data, isLoading }: any = useQuery({
    queryKey: ["popular"],
  });  

  return (
    <div className="w-full px-2 overflow-auto space-y-10 scrollbar-none">
      <SliderComponent />
      <div>
        <div className="flex justify-between">
          <h1 className="font-extrabold text-[30px] mb-5">Popular on Movie</h1>
          <div className="flex items-center gap-5">
            <Button size={"icon"} onClick={() => setPage((prev) => prev > 1 ? prev - 1 : prev)}>
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
            : data?.results?.map((mov: any, index: any) => (
                <CardMovieReuseble
                  key={index}
                  idMovie={mov.id}
                  poster_path={mov.poster_path}
                  title={mov.title || mov.name}
                  vote_average={mov.vote_average}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
