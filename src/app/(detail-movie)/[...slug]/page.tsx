import MovieCommon from "@/components/common/movie-common";
import React from "react";

const DetailMovie = ({ params }: { params: { slug: string } }) => {
  console.log(params);

  return (
    <>
      {params.slug[1] === "movie" && <MovieCommon idMovie={params.slug[0]} />}
    </>
  );
};

export default DetailMovie;
