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
    throw new Error("Failed to fetch similar movies");
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
    <section className="mb-10">
      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          sm:gap-6
          lg:gap-8
          px-6
        "
      >
        {sameMovies.slice(0, 5).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default Same;