"use client";

import Image from "next/image";
import { useState } from "react";
import { IoClose, IoPlay, IoStar } from "react-icons/io5";

type Movie = {
  id: number;
  title: string;
  backdrop_path: string | null;
  vote_average: number;
  overview: string;
};

export const Bigpic = ({ movie }: { movie: Movie }) => {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrailerClick = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      const trailer = data.results?.find((v: any) => v.type === "Trailer");
      if (trailer) setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full group">
      {/* Trailer Modal */}
      {trailerUrl && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <button onClick={() => setTrailerUrl(null)} className="absolute top-10 right-6 text-white text-4xl"><IoClose /></button>
          <iframe src={trailerUrl} allow="autoplay" className="w-full max-w-4xl aspect-video rounded-2xl shadow-2xl shadow-blue-500/20" />
        </div>
      )}

      {/* Main Container */}
      <div className="relative w-full h-[70vh] sm:h-[80vh] overflow-hidden">
        <Image
          src={movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : "/no-image.png"}
          alt={movie.title}
          fill
          priority
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Advanced Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-transparent hidden md:block" />

        {/* Content Area */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-12 lg:p-20 flex flex-col justify-end h-full">
          <div className="max-w-3xl space-y-4 translate-y-4 sm:translate-y-0 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            
            {/* Badge & Rating */}
            <div className="flex items-center gap-3">
              <span className="bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-blue-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                Now Playing
              </span>
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                <IoStar className="text-yellow-400 text-sm" />
                <span className="text-white font-bold text-xs">{movie.vote_average?.toFixed(1)}</span>
              </div>
            </div>

            {/* Title with Gradient Effect */}
            <h1 className="text-4xl sm:text-6xl font-black text-white leading-[0.9] tracking-tighter drop-shadow-2xl">
              {movie.title}
            </h1>

            {/* Description (Desktop only for clean look) */}
            <p className="hidden sm:block text-gray-300 text-lg line-clamp-2 max-w-xl leading-relaxed">
              {movie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button 
                onClick={handleTrailerClick}
                className="flex-1 sm:flex-none bg-white text-black hover:bg-blue-600 hover:text-white px-8 py-4 rounded-2xl font-black transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95"
              >
                {loading ? <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin rounded-full"/> : <IoPlay className="text-xl"/>}
                <span className="uppercase tracking-widest text-sm">Watch Trailer</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-Only Info Section (Glass Card style) */}
      <div className="block sm:hidden -mt-8 relative z-10 px-4 pb-10">
        <div className="bg-[#121212]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-6 shadow-2xl">
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 italic mb-4">
            "{movie.overview}"
          </p>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent w-full" />
        </div>
      </div>
    </div>
  );
};