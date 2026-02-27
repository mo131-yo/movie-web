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

export const Same = async ({ movieId }: SameProps) => {
  const sameMovies = await fetchSameMoviesDB(movieId);

  if (!sameMovies || sameMovies.length === 0) {
    return null;
  }

return (
  <div className="w-full mb-10">
    <div className="hidden sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8 px-4 sm:px-8">
      {sameMovies && sameMovies.length > 0 ? (
        sameMovies.slice(0, 5).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">Kino oldsongui</p>
      )}
    </div>

    <div className="grid grid-cols-2 gap-4 px-4 sm:hidden"> 
      {sameMovies && sameMovies.length > 0 ? (
        sameMovies.slice(0, 6).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">Kino oldsongui</p>
      )}
    </div>
  </div>
);
}