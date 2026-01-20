import React from "react";
import { MovieCard } from "./MovieCard";
// import { DynamicPagination} from "@/app/components/DynamicPagination"

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
};

export const fetchfromTopRatedMovieDB = async (category: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
      next: { revalidate: 60 },
    }
  );

  const data = await response.json();
  return data.results;
};

export const Toprated = async () => {
  const topratingMovies: Movie[] =
    await fetchfromTopRatedMovieDB("top_rated");

  return (
    <section className="w-full">
      {/* Title */}
      <div className="px-4 sm:px-8 lg:px-20 pb-4 flex items-center justify-between">
        <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-black">
          Top rated movies
        </h3>
      </div>

      {/* Grid */}
      <div
   className="
    grid
    grid-cols-2
    gap-5
    sm:gap-6
    lg:gap-8
    sm:grid-cols-3
    md:grid-cols-4
    lg:grid-cols-5
    px-4
    sm:px-8
    lg:px-20
    mb-10
  "
      >
        {topratingMovies.slice(0, 10).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};
