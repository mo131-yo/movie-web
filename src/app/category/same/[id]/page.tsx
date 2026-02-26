import React from 'react';
import { MovieCard } from "@/app/components/MovieCard";
import { DynamicPagination } from "@/app/components/DynamicPagination";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
};

export const fetchSimilarMovies = async (id: string, page: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
      next: { revalidate: 3600 } 
    }
  );

  if (!res.ok) return { movies: [], totalPages: 0 };
  
  const data = await res.json();
  return {
    movies: (data.results as Movie[]) || [],
    totalPages: data.total_pages > 500 ? 500 : data.total_pages,
  };
};


export const Results = async ({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ page?: string }> 
}) => {
  const { id } = await params;
  const sParams = await searchParams;
  const currentPage = Number(sParams.page) || 1;

  const { movies, totalPages } = await fetchSimilarMovies(id, currentPage);

  if (movies.length === 0) {
    return <div className="p-20 text-center">Tiim kino baikhgui</div>
  }

  return (
    <div className='pb-20 pt-20'>
      <h3 className="font-semibold text-2xl text-black px-20 pb-5 dark:text-white pb-10">
        More Like This
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-8 lg:px-20">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
      <div className='pt-20'>
        <DynamicPagination totalPages={totalPages} genreId={id} />
      </div>
    </div>
  );
};

export default Results;