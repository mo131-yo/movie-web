import React from "react";
import { MovieCard } from "./MovieCard";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

type SameProps = {
  movieId: string;
};

export const fetchSameMoviesDB = async (
  movieId: string
): Promise<Movie[]> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    }
  );

  if (!response.ok) {
    throw new Error("Failed");
  }

  const data = await response.json();
  return data.results;
};

const Same = async ({ movieId }: SameProps) => {
  const sameMovies = await fetchSameMoviesDB(movieId);

  if (!sameMovies || sameMovies.length === 0) {
    return null;
  }

  return (
    <div className="mb-10 px-6">
  <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6 lg:gap-8">
    {sameMovies.slice(0, 5).map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
  <div className="grid grid-cols-2 gap-4 sm:hidden">
    {sameMovies.slice(0, 6).map((movie) => (
      <MovieCard key={movie.id} movie={movie} />
    ))}
  </div>
</div>
  );
};

export default Same;