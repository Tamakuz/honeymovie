import cheerio from "cheerio";
import axios from "axios";
import { NextResponse } from "next/server";

export interface MovieDetail {
  imgUrl: string;
  title: string;
  rating: string;
  synopsis: string;
  views: string;
  genres: string[];
  quality: string;
  year: string;
  duration: string;
  country: string;
  releaseDate: string;
  language: string;
  director: string;
  cast: string[];
  stream: string[];
  relatedMovies: RelatedMovie[];
}

export interface RelatedMovie {
  title: string;
  url: string;
  imageUrl: string;
  rating: string;
  duration: string;
  quality: string;
  genres: string[];
  country: string;
  releaseDate: string;
  director: string;
  trailerUrl: string;
  selfUrl: string;
}

export const GET = async (req: Request, { params }: { params: { slug: string } }) => {
  try {
    const url = `https://netflix02.pusatmovie21.site/${params.slug}`;
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const imgUrl = $('figure.pull-left img').attr('src') || '';
    const title = $('div.gmr-movie-data-top h1.entry-title').text() || '';
    const rating = $('div.gmr-meta-rating span[itemprop="ratingValue"]').text() || '';
    const synopsis = $('div.gtx-body').text() || '';
    const views = $('div.gmr-moviedata.gmr-movie-view').text().replace('Views:', '').trim() || '';
    const genres = $('div.gmr-moviedata:contains("Genre:") a').map((i, el) => $(el).text()).get() || [];
    const quality = $('div.gmr-moviedata:contains("Quality:") a').text() || '';
    const year = $('div.gmr-moviedata:contains("Year:") a').text() || '';
    const duration = $('div.gmr-moviedata:contains("Duration:") span').text() || '';
    const country = $('div.gmr-moviedata:contains("Country:") a').text() || '';
    const releaseDate = $('div.gmr-moviedata:contains("Release:") time').text() || '';
    const language = $('div.gmr-moviedata:contains("Language:") span').text() || '';
    const director = $('div.gmr-moviedata:contains("Director:") span[itemprop="name"]').text() || '';
    const cast = $('div.gmr-moviedata:contains("Cast:") span[itemprop="name"]').map((i, el) => $(el).text()).get() || '';

    const stream: string[] = [];
    const playerTabs = $('ul.muvipro-player-tabs li');
    const playerCount = playerTabs.length;

    for (let i = 1; i <= playerCount; i++) {
      const playerUrl = `https://netflix02.pusatmovie21.site/${params.slug}?player=${i}`;
      const playerResponse = await axios.get(playerUrl);
      const playerHtml = playerResponse.data;
      const player$ = cheerio.load(playerHtml);
      const iframeSrc = player$('iframe').attr('src') || '';
      if (iframeSrc) {
        stream.push(iframeSrc);
      }
    }

    const relatedMovies: RelatedMovie[] = [];
    $('article.item').each((i, elem) => {
      const relatedTitle = $(elem).find('h2.entry-title a').text() || '';
      const relatedUrl = $(elem).find('h2.entry-title a').attr('href') || '';
      const relatedImageUrl = $(elem).find('.content-thumbnail a img').attr('src') || '';
      const relatedRating = $(elem).find('.gmr-rating-item').text().trim() || '';
      const relatedDuration = $(elem).find('.gmr-duration-item').text().trim() || '';
      const relatedQuality = $(elem).find('.gmr-quality-item a').text().trim() || '';
      const relatedGenres = $(elem).find('.gmr-movie-on a').map((j, genre) => $(genre).text()).get() || [];
      const relatedCountry = $(elem).find('span[itemprop="contentLocation"] a').text() || '';
      const relatedReleaseDate = $(elem).find('time[itemprop="dateCreated"]').attr('datetime') || '';
      const relatedDirector = $(elem).find('span[itemprop="director"] span[itemprop="name"]').text() || '';
      const relatedTrailerUrl = $(elem).find('.gmr-trailer-popup').attr('href') || '';
      const selfUrl = relatedUrl.replace('https://netflix02.pusatmovie21.site/', '').replace(/\/$/, '');

      relatedMovies.push({
        title: relatedTitle,
        url: relatedUrl,
        imageUrl: relatedImageUrl,
        rating: relatedRating,
        duration: relatedDuration,
        quality: relatedQuality,
        genres: relatedGenres,
        country: relatedCountry,
        releaseDate: relatedReleaseDate,
        director: relatedDirector,
        trailerUrl: relatedTrailerUrl,
        selfUrl: selfUrl
      });
    });

    const movieDetail: MovieDetail = {
      imgUrl,
      title,
      rating,
      synopsis,
      views,
      genres,
      quality,
      year,
      duration,
      country,
      releaseDate,
      language,
      director,
      cast,
      stream,
      relatedMovies
    };

    return NextResponse.json(movieDetail);
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
};