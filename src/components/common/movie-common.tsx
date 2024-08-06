import React from "react";
import HeroMovieAtomic from "../atomic/hero-movie-atomic";

const MovieCommon = ({ idMovie }: { idMovie: string }) => {
  return (
    <div className="w-full space-y-5 overflow-auto scrollbar-none">
      <HeroMovieAtomic idMovie={idMovie} />
      {/* <CastCrewMovieAtomic idMovie={idMovie} />
      <MediaMovieAtomic idMovie={idMovie} />
      <RecomendationMovieAtomic idMovie={idMovie} /> */}
    </div>
  );
};

export default MovieCommon;
