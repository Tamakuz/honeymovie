import React from "react";
import HeroMovieAtomic from "../atomic/hero-movie-atomic";
import CastCrewMovieAtomic from "../atomic/cast-crew-movie-atomic";
import MediaMovieAtomic from "../atomic/media-movie-atomic";
import RecomendationMovieAtomic from "../atomic/rcomrndation-movie-atomic";

const MovieCommon = ({ idMovie }: { idMovie: string }) => {
  return (
    <div className="w-full space-y-5 overflow-auto scrollbar-none">
      <HeroMovieAtomic idMovie={idMovie} />
      <CastCrewMovieAtomic idMovie={idMovie} />
      <MediaMovieAtomic idMovie={idMovie} />
      <RecomendationMovieAtomic idMovie={idMovie} />
    </div>
  );
};

export default MovieCommon;
