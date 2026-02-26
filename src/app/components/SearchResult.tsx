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
  if (!keyword) return null;

  return (
    <div className="absolute left-0 z-50 sm:w-94.75 w-80 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg p-3 space-y-2">
      {results.length > 0 ? (
        <>
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
                <div className="w-[50px] h-[75px] bg-gray-300 dark:bg-gray-700 rounded flex items-center justify-center text-[10px] text-gray-500">
                  No Image
                </div>
              )}

              <div className="flex-1">
                <p className="font-medium text-sm line-clamp-1">{movie.title}</p>
                <p className="text-xs text-gray-500">{movie.release_date?.split("-")[0]}</p>
              </div>
              <Button size="sm" variant="secondary" className="hover:bg-gray-300 dark:hover:bg-white dark:hover:text-black">
                See more
              </Button>
            </Link>
          ))}

          <Link 
            href={`/results?query=${keyword}`} 
            onClick={onClose} 
            className="block text-center text-sm font-medium text-indigo-600 hover:underline pt-2 border-t dark:border-gray-800"
          >
            See all results for "{keyword}"
          </Link>
        </>
      ) : (
        <div className="py-8 text-center space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tiim nertei kino bhq bn <span className="font-semibold text-black dark:text-white">"{keyword}"</span>
          </p>
        </div>
      )}
    </div>
  );
};