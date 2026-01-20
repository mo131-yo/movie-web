"use client";

import { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { TrailerModal } from "./Trailer"; // Таны өөрийн файл

export default function TrailerSection({ movieId, title }: { movieId: number | string, title: string }) {
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleWatchTrailer = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`, // Client талд NEXT_PUBLIC_ байх ёстой
        },
      });
      const data = await res.json();
      const trailer = data.results?.find((v: any) => v.type === "Trailer" && v.site === "YouTube");

      if (trailer) {
        setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}?autoplay=1`);
      } else {
        alert("Уучлаарай, трэйлер олдсонгүй.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleWatchTrailer}
        disabled={loading}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50"
      >
        <FaPlay />
        {loading ? "Loading..." : "Watch Trailer"}
      </button>

      {/* Таны модаль энд ажиллана */}
      <TrailerModal 
        url={trailerUrl} 
        onClose={() => setTrailerUrl(null)} 
        title={title} 
      />
    </>
  );
}