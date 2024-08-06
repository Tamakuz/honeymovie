"use client";
import { MovieDetail } from "@/app/api/movie/play/[slug]/route";
import { fetcher } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

const DetailMovie = ({ params }: { params: { slug: string } }) => {

  const {
    data: movies,
    isLoading,
    error,
  } = useSWR(`/api/movie/play/${params.slug[0]}`, fetcher) as {
    data: MovieDetail;
    isLoading: boolean;
    error: any;
  };
  console.log(movies);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full overflow-y-auto scrollbar-none space-y-5 p-5 ">
      <div className="aspect-video rounded-lg overflow-hidden w-full shadow-lg">
        <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: `<iframe src="${movies.stream[0]}" class="w-full h-full object-cover" allowFullScreen></iframe>` }} />
      </div>
      <div className="flex gap-5 items-start">
        <Image src={movies.imgUrl} alt={movies.title} width={150} height={225} className="rounded-lg shadow-lg" />
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{movies.title}</h2>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-primary font-medium text-lg">{movies.rating}</span>
            <span className="text-muted-foreground text-lg">{movies.views} views</span>
          </div>
          <p className="text-muted-foreground mb-4">{movies.synopsis}</p>
          <div className="grid grid-cols-2">
            <div>
              <span className="font-medium">Genres:</span>{" "}
              {movies.genres.join(", ")}
            </div>
            <div>
              <span className="font-medium">Quality:</span> {movies.quality}
            </div>
            <div>
              <span className="font-medium">Year:</span> {movies.year}
            </div>
            <div>
              <span className="font-medium">Duration:</span> {movies.duration}
            </div>
            <div>
              <span className="font-medium">Country:</span> {movies.country}
            </div>
            <div>
              <span className="font-medium">Release Date:</span>{" "}
                {movies.releaseDate}
            </div>
            <div>
              <span className="font-medium">Language:</span> {movies.language}
            </div>
            <div>
              <span className="font-medium">Director:</span> {movies.director}
            </div>
            <div className="col-span-2">
              <span className="font-medium">Cast:</span> {movies.cast.join(", ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
