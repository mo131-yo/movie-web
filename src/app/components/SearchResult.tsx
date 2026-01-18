  import React from 'react';
  import Image from 'next/image';
  import Link from "next/link";
  import { Button } from "@/components/ui/button";

  export type Movie = {
    id: string;
    title: string;
    poster_path: string;
    vote_average: number;
    backdrop_path: string;
    overview: string;
    release_date :string
  };
  type Props = {
    id: string;
    keyword: string;
    results: Movie[];
    onClose: () => void;
  };


  export const SearchResult = ({ keyword, results, onClose }: Props) => {
    if (!keyword) return null;

    return (
      <div className="absolute z-50 bg-white rounded-xl shadow-lg mt-2 p-4 space-y-3">
        {results.slice(0, 5).map((movie) => {
          return (
            <div
              key={movie.id} onClick={onClose} className="flex gap-3 cursor-pointer  hover:bg-gray-100  rounded-lg p-2"> {movie.poster_path && (
                <Image src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} width={60} height={90} className="rounded"/>
              )}
              <div className="flex flex-col justify-center flex-1">
                <span className="font-medium">{movie.title}</span>
                <span className="text-sm text-gray-500">({movie.release_date?.split("-")[0]} )</span>
              </div>
            <Link href={`/movie/${movie.id}`} onClick={onClose}>
              <Button className="w-30 h-9 bg-amber-200">View</Button>
            </Link>
            </div>
          );
        })}
          <Link href={`/results/${results.id}`} onClick={onClose}>
              <Button className="w-30 h-9 bg-amber-200">Results</Button>
            </Link>
      </div>
    );
  }
