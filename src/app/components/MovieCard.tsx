"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPlay, FaStar } from "react-icons/fa";
import { TrailerModal } from "./Trailer";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

export const MovieCard = ({ movie }: { movie: Movie }) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchTrailer = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        }
      );

      const data = await res.json();
      const trailer = data.results?.find(
        (v: any) => v.type === "Trailer" && v.site === "YouTube"
      );

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
      } else {
        setError("Олдсонгүй");
        setTimeout(() => setError(null), 2000);
      }
    } catch (err) {
      setError("Алдаа гарлаа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial="initial"
        whileHover={{ 
          scale: 1.15, 
          zIndex: 50,
          transition: { duration: 0.3 }
        }}
        className="relative w-full sm:w-48 md:w-56 lg:w-60 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-red-600/50 transition-shadow duration-300"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.rect
            width="100" height="100" fill="none" stroke="#ef4444" strokeWidth="1.5" pathLength="1"
            variants={{ initial: { pathLength: 0, opacity: 0 }, hover: { pathLength: 1, opacity: 1 } }}
            transition={{ duration: 0.6 }}
          />
        </svg>

        <Link href={`/movie/${movie.id}`}>
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/no-image.png"}
              alt={movie.title} fill className="object-cover"
            />
          </div>
        </Link>

        <div className="p-3">
          <h3 className="text-sm font-bold truncate text-gray-800 dark:text-gray-100">{movie.title}</h3>
          <div className="flex items-center gap-1 mt-1 text-amber-500 text-xs">
            <FaStar /> <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>

        {/* Trailer Button */}
        <button
          onClick={handleFetchTrailer}
          disabled={loading}
          className="w-full py-2 bg-gray-100 dark:bg-gray-800 hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold disabled:opacity-50"
        >
          {loading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full" />
          ) : (
            <FaPlay />
          )}
          {loading ? "Хайж байна..." : "Watch Trailer"}
        </button>

        {error && (
          <div className="absolute inset-x-0 bottom-10 bg-red-600 text-white text-[10px] text-center py-1 font-bold z-30">
            {error}
          </div>
        )}
      </motion.div>
      
      <TrailerModal 
        url={trailerUrl} 
        onClose={() => setTrailerUrl(null)} 
        title={movie.title} 
      />
    </>
  );
};