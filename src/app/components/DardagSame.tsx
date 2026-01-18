import React from 'react'
import Image from "next/image";
import { MovieCard } from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export const fetchSameMoviesDB = async (movieId: any, currentPage: number): Promise<Movie[]> => {
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
    const data = await response.json();

  return Array.isArray(data?.results) ? data.results : [];
};
export const DardagSame = ({ movies }: { movies: Movie[] }) => {

  return (
    <div>
      <h3 className="font-semibold text-2xl text-black px-20 pb-5">
        More like This
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-5 px-20 w-full mb-8 gap-8">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};