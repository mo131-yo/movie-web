"use client";

import { motion } from "framer-motion"; 
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoClose } from "react-icons/io5";


type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

type MovieCardProps = {
  movie: Movie;
};
type Props = {
  keyword: string;
  results: Movie[];
  onClose: () => void;
};

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrailerClick = async () => {
    try {
      setLoadingTrailer(true);
      setError(null);

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch trailer");

      const data = await res.json();
      const trailer = data.results.find(
        (v: any) => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } else {
        setError("Trailer not found");
        setTrailerUrl(null);
      }
    } catch (err) {
      setError("Error loading trailer");
      setTrailerUrl(null);
      console.error(err);
    } finally {
      setLoadingTrailer(false);
    }
  };

  const closeTrailer = () => setTrailerUrl(null);
  

  return (
    <>
      {/* Motion Card */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="relative w-60 rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800 transition-colors"
        transition={{ duration: 0.25 }}
      >
        {/* Movie poster*/}
        <Link href={`/movie/${movie.id}`}>
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/no-image.png"
            }
            alt={movie.title}
            width={240}
            height={360}
            className="rounded-t-xl object-cover hover:opacity-50"
          />
        </Link>
        <div className="p-3">
          <div className="text-sm font-semibold line-clamp-1 text-gray-800 dark:text-gray-200">
            {movie.title}
          </div>
          <div className="flex items-center gap-1 text-sm mt-1 text-gray-600 dark:text-gray-300">
            {/* <Image src="/star.png" alt="star" width={12} height={12} /> */}
            <p>{movie.vote_average.toFixed(1)}<span className="opacity-50">/10</span></p>
          </div>
        </div>

        {/* Trailer Button */}
        <button
          onClick={handleTrailerClick}
          className="w-full bg-gray-500 hover:bg-red-600 text-white px-2 py-2 text-sm rounded-b-md transition-colors"
        >
          {loadingTrailer ? "Loading..." : "Watch Trailer"}
        </button>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 mt-1 text-center">{error}</p>
        )}
        
      </motion.div>

      {/* Trailer hargdats*/}
      {trailerUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4">
          {/* Close Button */}
          <button
            onClick={closeTrailer}
            className="absolute top-4 right-4 text-white text-2xl p-2 hover:text-red-400"
          >
            <IoClose />
          </button>
          <iframe
            width="800"
            height="450"
            src={trailerUrl}
            title={movie.title}
            allowFullScreen
            className="rounded shadow-lg"
          ></iframe>
        </div>
      )}
    </>
  );
};
