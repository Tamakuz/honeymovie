type VideoType =
  | "Clip"
  | "Behind the Scenes"
  | "Featurette"
  | "Trailer"
  | "Teaser";

export type VideoMovieType = {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: VideoType;
  official: boolean;
  published_at: string; // Gunakan tipe yang sesuai dengan format tanggal yang diinginkan
};

export type VideoMovieResponse = {
  id: number;
  results: VideoMovieType[];
};
