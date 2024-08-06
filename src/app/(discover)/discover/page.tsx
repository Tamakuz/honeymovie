"use client";
import { Movie } from "@/app/api/movie/discover/route";
import CardMovieReuseble from "@/components/reuseble/card-movie-reuseble";
import { fetcher } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { useInView } from "react-intersection-observer";

const DiscoverPage = () => {
  const params = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);

  const { data, error } = useSWR(`/api/movie/discover?page=${page}`, fetcher);

  useEffect(() => {
    if (data) {
      setMovies(prevMovies => [...prevMovies, ...data]);
    }
  }, [data]);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView]);

  if (movies.length === 0) return <div className="w-full text-center">Loading...</div>;

  return (
    <div className="overflow-auto scrollbar-none pb-5">
      <div className="flex flex-wrap justify-around gap-5 movie-container">
        {movies.map((mov, index) => (
          <CardMovieReuseble
            key={index}
            selfLink={mov.selfLinkDetail}
            title={mov.title}
            poster_path={mov.imageUrl}
            vote_average={parseFloat(mov.rating)}
          />
        ))}
        <div ref={ref} className="w-full h-10 flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-t-2 border-gray-300 dark:border-gray-600"></div>
        </div>
      </div>
      {error && <div className="w-full text-center">Failed to load data</div>}
    </div>
  );
};

export default DiscoverPage;
