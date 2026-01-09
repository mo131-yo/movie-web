// import { useEffect, useState } from "react";
// import { SlArrowDown } from "react-icons/sl";
// import { Badge } from "@/app/ui/Badge";
// import { NextResponse } from "next/server";

// type Genre = {
//   id: number;
//   name: string;
// };

// export async function GET() {
//   const res = await fetch(
//     "https://api.themoviedb.org/3/genre/movie/list?language=en",
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const data = await res.json();
//   return NextResponse.json(data.genres);
// }
// export default function Genre() {
//   const [genres, setGenres] = useState<Genre[]>([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

//   useEffect(() => {
//     const fetchGenres = async () => {
//       const res = await fetch("/api/genres");
//       const data = await res.json();
//       setGenres(data);
//     };

//     fetchGenres();
//   }, []);

//   return (
//     <div className="relative z-50">
//       <Badge
//         variant="outline"
//         className="w-32 h-9 cursor-pointer flex gap-2 justify-center"
//         onClick={() => setIsOpen((p) => !p)}
//       >
//         <SlArrowDown />
//         {selectedGenre ? selectedGenre.name : "Genre"}
//       </Badge>

//       {isOpen && (
//         <div className="absolute top-12 left-0 w-75 h-75 bg-white dark:bg-gray-800 rounded-xl shadow-xl border p-4 overflow-y-auto">
//           {genres.length === 0 && (
//             <p className="text-sm text-gray-400">Loading...</p>
//           )}

//           {genres.map((g) => (
//             <div
//               key={g.id}
//               onClick={() => {
//                 setSelectedGenre(g);
//                 setIsOpen(false);
//               }}
//               className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition"
//             >
//               {g.name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/app/ui/Badge";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
  release_date :string
};
type Props = {
  keyword: string;
  results: Movie[];
  onClose: () => void;
};

export const Genre = ({ keyword, results, onClose }: Props) => {
  if (!keyword) return null;

  return (
    <div className="absolute z-50 bg-white rounded-xl shadow-lg mt-2 p-4 space-y-3">
      {results.slice(0, 5).map((movie) => {
        return (
          <Badge
             variant="outline" key={movie.id} onClick={onClose} className="flex gap-3 cursor-pointer  hover:bg-gray-100  rounded-lg p-2"> {movie.poster_path && (
              <Image src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} width={60} height={90} className="rounded"/>
            )}
            <div className="flex flex-col justify-center flex-1">
              <span className="font-medium">{movie.title}</span>
              <span className="text-sm text-gray-500">({movie.release_date?.split("-")[0]} )</span>
            </div>
          <Link href={`/movie/${movie.id}`} onClick={onClose}>
            <Button className="w-30 h-9 bg-amber-200">View</Button>
          </Link>
          </Badge>
        );
      })}
       <Link href={`/movie`} onClick={onClose}>
          <p className='text-lg text-black ' onClick={onClose}>Results</p>
       </Link>
    </div>
  );
}
