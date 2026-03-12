"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaPlay, FaStar } from "react-icons/fa";
import { TrailerModal } from "./TrailerModal";

export const MovieCard = ({ movie }: { movie: any }) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const ratingPercentage = Math.round(movie.vote_average * 10);
  
  const getRatingColor = (percent: number) => {
    if (percent >= 70) return "#21d07a";
    if (percent >= 40) return "#d2d531";
    return "#db2360"; // Улаан
  };

  const handleFetchTrailer = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
        {
          headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}` },
        }
      );
      const data = await res.json();
      const trailer = data.results?.find((v: any) => v.type === "Trailer" && v.site === "YouTube");

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
      } else {
        setError("Trailer oldsongui");
        setTimeout(() => setError(null), 2000);
      }
    } catch (err) {
      setError("Aldaa garlaa");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial="initial"
        whileHover={{ 
          scale: 1.15, 
          zIndex: 50,
          transition: { duration: 0.3 }
        }}
        className="relative w-full rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-red-600/50 dark:hover:shadow-blue-700/50 transition-shadow duration-300"
      >
        <svg className="absolute inset-0 w-full pointer-events-none z-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.rect
            width="100" height="100" fill="none" stroke="#ef4444" strokeWidth="1.5" pathLength="1"
            variants={{ initial: { pathLength: 0, opacity: 0 }, hover: { pathLength: 1, opacity: 1 } }}
            transition={{ duration: 0.6 }}
          />
        </svg>

        <Link href={`/movie/${movie.id}`}>
          <div className="relative aspect-2/3 w-full overflow-hidden">
            <Image
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/no-image.png"}
              alt={movie.title} fill className={`object-cover transition-all duration-500 ${isHovered ? "blur-sm brightness-50" : ""}`}
            />
            
            <div className="absolute top-2 left-2 z-30 scale-90 origin-top-left">
              <div className="relative w-12 h-12 bg-[#081c22] rounded-full flex items-center justify-center border-2 border-[#081c22] shadow-2xl">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="transparent" />
                  <motion.circle
                    cx="24" cy="24" r="20" stroke={getRatingColor(ratingPercentage)} strokeWidth="3" fill="transparent"
                    strokeDasharray={126}
                    initial={{ strokeDashoffset: 126 }}
                    animate={{ strokeDashoffset: 126 - (126 * ratingPercentage) / 100 }}
                    transition={{ duration: 1 }}
                  />
                </svg>
                <div className="absolute text-white font-bold text-[11px] flex items-start">
                  {ratingPercentage}<span className="text-[6px] mt-0.5">%</span>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center p-4 z-10"
                >
                  <p className="text-white text-center text-lg font-black uppercase tracking-tighter drop-shadow-lg">
                    {movie.title}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>

        <div className="p-3">
          <h3 className="text-sm font-bold truncate text-gray-800 dark:text-gray-100">{movie.title}</h3>
          <div className="flex items-center gap-1 mt-1 text-amber-500 text-xs">
            <FaStar /> <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>

        <button
          onClick={handleFetchTrailer}
          disabled={loading}
          className="w-full py-2 bg-gray-100 dark:bg-gray-800 hover:bg-red-600 dark:hover:bg-blue-900 hover:text-white transition-all flex items-center justify-center gap-2 text-xs font-bold disabled:opacity-50"
        >
          {loading ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full" />
          ) : (
            <FaPlay />
          )}
          {loading ? "Unshij bn" : "Watch Trailer"}
        </button>

        {error && (
          <div className="absolute inset-x-0 bottom-10 bg-red-600 text-white text-[10px] text-center py-1 font-bold z-30">
            {error}
          </div>
        )}
      </motion.div>
      <TrailerModal url={trailerUrl} onClose={() => setTrailerUrl(null)} title={movie.title} />
    </>
  );
};