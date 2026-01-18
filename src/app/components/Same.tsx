// import React from 'react'
// import Image from "next/image";
// import { MovieCard } from "./MovieCard";

// type PageProps = {
//   params: {
//     id: string;
//   };
// };
// export const fetchSameMoviesDB = async (movieId) => {
//   const response = await fetch(
//     `https://api.themoviedb.org/3/movie/${movieId}/similar?language=en-US&page=1`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//       next: { revalidate: 60 },
//     }
//   );
//   const data = await response.json();
//   return data.results;
// };
// const Same = async ({ movieId }) => {
//   const sameMovies = await fetchSameMoviesDB(movieId);

//   return (
//     <div>
//       <h3 className="font-semibold text-2xl text-black px-20 pb-5">
//         More like This
//       </h3>
//       <div className="grid grid-cols-5 px-20 w-full mb-8 gap-8">
//         {sameMovies.slice(0, 5).map((movie) => (
//           <MovieCard movie={movie} key={movie.id} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Same;


import React from "react";
import { MovieCard } from "./MovieCard";

/* Movie type (MovieCard-т таарах) */
export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
};

/* props type */
type SameProps = {
  movieId: string;
};

/* fetch function */
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

/* Server Component */
const Same = async ({ movieId }: SameProps) => {
  const sameMovies = await fetchSameMoviesDB(movieId);

  if (!sameMovies || sameMovies.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="font-semibold text-2xl text-black px-20 pb-5">
        More like this
      </h3>

      <div className="grid grid-cols-5 px-20 w-full mb-8 gap-8">
        {sameMovies.slice(0, 5).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Same;
