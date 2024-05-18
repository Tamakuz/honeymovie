import CreditsCommon from "@/components/common/credits-common";
import MovieCommon from "@/components/common/movie-common";
import React from "react";

const DetailMovie = ({ params }: { params: { slug: string } }) => {

  if (params.slug[2] === "credits") {
    return <CreditsCommon idMovie={params.slug[0]} />;
  };

  return (
    <>
      {params.slug[1] === "movie" && <MovieCommon idMovie={params.slug[0]} />}
    </>
  );
};

export default DetailMovie;
