
import React from 'react';
import { MovieCard } from "@/app/components/MovieCard";
import { log } from 'console';

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
};


export const fetchMostprice = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&sort_by=revenue.desc&language=en-US&page=1`,
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
  console.log(data);
  return data.results;
  
};

const Price = async ({ params }: { params: { id: string } }) => {
  const resolvedParams = await params;
  const movies: Movie[] = await fetchMostprice(resolvedParams.id);

  if (!movies || movies.length === 0) {
    return <div className="p-20 text-center">Илэрц олдсонгүй.</div>;
  }

  return (
    <div className='pb-20'>
      <h3 className="font-semibold text-2xl text-black pr-20 pl-20 pb-5">Most Money Earned</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 pr-20 pl-20 gap-8">
        {movies.slice(0, 10).map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Price;