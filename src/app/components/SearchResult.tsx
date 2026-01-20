//   import React from 'react';
//   import Image from 'next/image';
//   import Link from "next/link";
//   import { Button } from "@/components/ui/button";

//   export type Movie = {
//     id: string;
//     title: string;
//     poster_path: string;
//     vote_average: number;
//     backdrop_path: string;
//     overview: string;
//     release_date :string
//   };
//   type Props = {
//     id: string;
//     keyword: string;
//     results: Movie[];
//     onClose: () => void;
//   };


//   export const SearchResult = ({ keyword, results, onClose }: Props) => {
//     if (!keyword) return null;

//   return (
//     <div className="absolute z-50 bg-white rounded-xl shadow-lg mt-2 p-4 space-y-3">
//       {results.slice(0, 5).map((movie) => {
//         return (
//           <div
//             key={movie.id} onClick={onClose} className="flex gap-3 cursor-pointer  hover:bg-gray-100  rounded-lg p-2"> {movie.poster_path && (
//               <Image src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} width={60} height={90} className="rounded"/>
//             )}
//             <div className="flex flex-col justify-center flex-1">
//               <span className="font-medium">{movie.title}</span>
//               <span className="text-sm text-gray-500">({movie.release_date?.split("-")[0]} )</span>
//             </div>
//           <Link href={`/movie/${movie.id}`} onClick={onClose}>
//             <Button className="w-30 h-9 bg-amber-200">View</Button>
//           </Link>
//           </div>
//         );
//       })}
//        <Link href={`/results/${results.id}`} onClick={onClose}>
//           <p className='text-lg text-black ' onClick={onClose}>Results</p>
//        </Link>
//     </div>
//   );
// }


import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  release_date?: string;
};

type Props = {
  keyword: string;
  results: Movie[];
  onClose: () => void;
};

export const SearchResult = ({ keyword, results, onClose }: Props) => {
  if (!keyword || results.length === 0) return null;

  return (
    <div className="absolute z-50 w-94.75 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-2 p-3 space-y-2">
      {results.slice(0, 5).map((movie) => (
        <Link
          key={movie.id}
          href={`/movie/${movie.id}`}
          onClick={onClose}
          className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
              alt={movie.title}
              width={50}
              height={75}
              className="rounded"
            />
          ) : (
            <div className="w-12.5 h-18.75 bg-gray-300 rounded" />
          )}

          <div className="flex-1">
            <p className="font-medium text-sm">{movie.title}</p>
            <p className="text-xs text-gray-500">
              {movie.release_date?.split("-")[0]}
            </p>
          </div>

          <Button size="sm" variant="secondary" className="hover:bg-amber-200">
            See more
          </Button>
        </Link>
      ))}

      {/* See all results */}
      <Link href={`/results?query=${keyword}`}
        onClick={onClose}
        className="block text-base font-medium text-indigo-600 hover:underline pt-2"
      >
        See all results for "{keyword}"
      </Link>
    </div>
  );
};
