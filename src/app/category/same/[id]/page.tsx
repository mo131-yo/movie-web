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

// Хайлтын утгаар (searchValue) кинонуудыг авах функц
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
  return data.results; // Зөвхөн кинонуудын жагсаалтыг (Array) буцаана
};

const Results = async ({ params }: { params: { id: string } }) => {
  // URL-аас ирж буй 'id' нь энд 'хайх үг' (query) гэж ойлгогдоно
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




// import { MoreLike } from "@/app/components/MoreLike";
// import { Pagination } from "@/components/ui/pagination";

// type Props = {
//   searchParams: {
//     page?: string;
//   };
// };

//  export type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: number;
// };

// export const fetchMovies = async (page: number) => {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     }
//   );

//   // if (!res.ok) {
//   //   throw new Error("Failed to fetch movies");
//   // }

//   return res.json();
// };
// export default async function Home({ searchParams }: Props) {
//   const page = Number(searchParams.page) || 1;

//   const data = await fetchMovies(page);

//   return (
//     <main className="p-10">
//       <h1 className="text-2xl mb-6">🎬 Popular Movies</h1>

//       <MoreLike movies={data.results} />

//       <Pagination  />
//     </main>
//   );
// }
