"use client";
import CardMovieReuseble from "@/components/reuseble/card-movie-reuseble";
import { fetcher } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

const DiscoverPage = () => {
  const params = useSearchParams();
  const currentParamsQuery = params.get("query");
  const currentCategory = params.get("category");

  const { data: dataSearch, isLoading: loadingSearch } = useSWR(
    `https://api.themoviedb.org/3/search/${
      currentCategory === "movie" ? "movie" : "tv"
    }?query=${currentParamsQuery}&api_key=${process.env
      .NEXT_PUBLIC_APIKEY_TMDB!}`,
    fetcher
  );
  const { data: dataDiscover, isLoading: loadingDiscover } = useSWR(
    `https://api.themoviedb.org/3/discover/${
      currentCategory === "movie" ? "movie" : "tv"
    }?api_key=${process.env.NEXT_PUBLIC_APIKEY_TMDB!}`,
    fetcher
  );

  if (loadingSearch || loadingDiscover) return <div className="w-full text-center">Loading...</div>;

  console.log(dataSearch);

  return (
    <div className="overflow-auto scrollbar-none pb-5">
      {currentParamsQuery ? (
        <div className="flex flex-wrap justify-around gap-5">
          {dataSearch.results?.map((mov: any, index: any) => (
            <CardMovieReuseble
              key={index}
              idMovie={mov.id}
              poster_path={mov.poster_path}
              title={mov.title || mov.name}
              vote_average={mov.vote_average}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-around gap-5">
          {dataDiscover.results?.map((mov: any, index: any) => (
            <CardMovieReuseble
              key={index}
              idMovie={mov.id}
              poster_path={mov.poster_path}
              title={mov.title || mov.name}
              vote_average={mov.vote_average}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscoverPage;
