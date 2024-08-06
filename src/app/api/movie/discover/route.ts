import { NextRequest, NextResponse } from "next/server";
import cheerio from "cheerio";
import axios from "axios";

export interface Movie {
  title: string;
  url: string;
  imageUrl: string;
  rating: string;
  duration: string;
  quality: string;
  genres: string[];
  releaseDate: string;
  director: string;
  trailerUrl: string;
  selfLinkDetail: string;
  country: string;
  totalEps?: string;
  type?: string;
}

export const GET = async (req: NextRequest) => {
  try {
    const page = req.nextUrl.searchParams.get('page') || 1;
    const url = "https://netflix02.pusatmovie21.site/category/box-office/";
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const movies: Movie[] = [];
    const articles = $('#gmr-main-load article.item-infinite');
    if (articles.length === 0) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    articles.each((i, elem) => {
      const title = $(elem).find('h2.entry-title a').text() || '';
      const url = $(elem).find('h2.entry-title a').attr('href') || '';
      const imageElement = $(elem).find('.content-thumbnail a img');
      const imageUrl = imageElement.attr('src') || '';
      const rating = $(elem).find('.gmr-rating-item').text().trim() || '';
      const duration = $(elem).find('.gmr-duration-item').text().trim() || '';
      const quality = $(elem).find('.gmr-quality-item a').text().trim() || '';
      const genres = $(elem).find('.gmr-movie-on a').map((j, genre) => $(genre).text()).get() || [];
      const releaseDate = $(elem).find('time[itemprop="dateCreated"]').attr('datetime') || '';
      const director = $(elem).find('span[itemprop="director"] span[itemprop="name"]').text() || '';
      const trailerUrl = $(elem).find('.gmr-trailer-popup').attr('href') || '';
      const selfLinkDetail = url.split('/').filter(part => part).pop() || '';
      const country = $(elem).find('span[itemprop="contentLocation"] a').text() || '';

      const totalEps = $(elem).find('.gmr-numbeps span').text() || '';
      const type = $(elem).find('.gmr-posttype-item').text().includes('TV Show') ? 'TV Show' : 'Movie';

      const movie: Movie = {
        title,
        url,
        imageUrl,
        rating,
        duration,
        quality,
        genres,
        releaseDate,
        director,
        trailerUrl,
        selfLinkDetail,
        country
      };

      if (totalEps) {
        movie.totalEps = totalEps;
      }

      if (type) {
        movie.type = type;
      }

      movies.push(movie);
    });

    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
