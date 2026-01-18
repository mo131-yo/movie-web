<<<<<<< HEAD
import React from 'react';
import { MovieCard } from "@/app/components/MovieCard";
=======
// "use client"
// import Image from "next/navigation";
// import Link from "next/link";
// import {useRouter} from "next/navigation";

// export type Movie={
//   id: number;
//     title: string;
//     poster_path: string;
//     vote_average: number;
//     backdrop_path:string;
//     overview: string;
// }

// type Props= {
//     word : string;
//     results : Movie[];
//     onClose: ()=> void;
// }
// export const ResultsMovie = ({ word , results, onClose}: Props)=>{
//     if(!word) return null;
//     const router = useRouter();
//     return(
//         <div>
//             <div>
//                 {results.slice(0,5).map((movie)=>(
//                     <div key={movie.id} onClick={()=>{(router.push(`/movie/${movie.id}`); onClose();}} className="flex justify-center ">
//                     <div className="flex items-center gap-3">
//                         {movie.poster_path && (
//                         <div>
//                             <Image 
//                             src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
//                                         alt={movie.title}
//                                         width={80}
//                                         height={320}
//                                         className="w-full"
//                                       />
//                         </div>
//                     }
//                     </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
>>>>>>> 38223627cfe9280874c24a8bcc826f54203fce2d

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  backdrop_path: string;
  overview: string;
};

<<<<<<< HEAD
// 1. Хайлтын функц хэвээрээ (page=1 гэж тогтмол болгов)
export const fetchSearchMovies = async (searchValue: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=1`,
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
  // URL-аас ирсэн id-г хайлтын утга болгож ашиглах
  const movies: Movie[] = await fetchSearchMovies(resolvedParams.id);

  if (!movies || movies.length === 0) {
    return (
      <div className="p-20 text-center text-black">
        "{resolvedParams.id}" нэртэй кино олдсонгүй.
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      <h3 className="font-semibold text-2xl text-black px-20 py-10">
        Search Results for: {resolvedParams.id}
      </h3>
      
      {/* Grid бүтцийг сайжруулж, өндрийн хязгаарлалтыг авсан */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 px-20 gap-8">
        {movies.map((movie) => {
          // 2. MovieCard-д очих датаг засаж бэлтгэх (Sanitize data)
          const sanitizedMovie = {
            ...movie,
            // Хэрэв үнэлгээ байхгүй бол 0 болгоно (toFixed алдаанаас сэргийлнэ)
            vote_average: movie.vote_average ?? 0,
            // Зургийн замыг бүтэн болгох (Base URL нэмэх)
            poster_path: movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
              : "/no-image-placeholder.png" 
          };

          return <MovieCard movie={sanitizedMovie} key={movie.id} />;
        })}
      </div>
    </div>
  );
};

export default Results;




// import React from 'react';
// import { MovieCard } from "@/app/components/MovieCard";

// export type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
//   vote_average: number;
//   backdrop_path: string;
//   overview: string;
// };

// // 1. API хаягийг засаж, хайлт биш тухайн киноны ID-аар өгөгдөл авахаар болгов
// export const fetchMovieById = async (id: string) => {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/movie/${id}?language=en-US`, // ID-аар авах зөв хаяг
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
//       },
//       next: { revalidate: 3600 } // Cache тохиргоо (сонголттой)
//     }
//   );

//   // if (!res.ok) {
//   //   throw new Error('Failed to fetch movie');
//   // }

//   return res.json();
// };

// const Results = async ({ params }: { params: { id: string } }) => {
//   // Next.js 15+ дээр params-ийг await хийх шаардлагатай
//   const resolvedParams = await params;
//   const movie: Movie = await fetchMovieById(resolvedParams.id);

//   // Хэрэв та жагсаалт биш, зөвхөн нэг кино харуулж байгаа бол .map() ашиглахгүй
//   return (
//     <div>
//       <h3 className="font-semibold text-2xl text-black pr-20 pl-20 pb-5">All Results</h3>
//       <div className="flex flex-col items-center pr-20 pl-20 w-full gap-8">
//         <MovieCard movie={movie} key={movie.id} />
//       </div>
//     </div>
//   );
// };

// export default Results;
=======
type Props = {
  word: string;
  results: Movie[];
  onClose: () => void;
};

export const ResultsMovie = ({ word, results, onClose }: Props) => {
  const router = useRouter();

  if (!word || results.length === 0) return null;

  return (
    <div className="absolute z-50 bg-white rounded-xl shadow-lg mt-2 w-full p-3 space-y-2">
      {results.slice(0, 5).map((movie) => (
        <div
          key={movie.id}
          onClick={() => {
            router.push(`/movie/${movie.id}`)
            onClose();
          }}
          className="flex gap-3 items-center cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
        >
          {movie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              width={60}
              height={90}
              className="rounded"
            />
          )}

          <div className="flex flex-col">
            <span className="font-medium">{movie.title}</span>
            {movie.vote_average !== undefined && (
              <span className="text-sm text-gray-500">
                ⭐ {movie.vote_average.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      ))}

      {/* 🔽 SEE ALL RESULTS */}
      <Link
        href={`/results/${encodeURIComponent(word)}`}
        onClick={onClose}
        className="block text-center bg-amber-200 hover:bg-amber-300 py-2 rounded-lg font-medium"
      >
        See all results for "{word}"
      </Link>
    </div>
  );
};
>>>>>>> 38223627cfe9280874c24a8bcc826f54203fce2d
