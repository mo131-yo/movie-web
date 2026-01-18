
import React from 'react';
import { MovieCard } from "@/app/components/MovieCard";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
};


export const fetchSearchMovies = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = await res.json();
  return data.results;
};

const Results = async ({ params }: { params: { id: string } }) => {
  const resolvedParams = await params;
  const movies: Movie[] = await fetchSearchMovies(resolvedParams.id);

  if (!movies || movies.length === 0) {
    return <div className="p-20 text-center">Илэрц олдсонгүй.</div>;
  }

  return (
    <div className='pb-20'>
      <h3 className="font-semibold text-2xl text-black pr-20 pl-20 pb-5">Search Results</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pr-20 pl-20 gap-8">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Results;