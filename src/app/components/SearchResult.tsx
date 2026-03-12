"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Бүх төрлийн контентыг дэмжих Universal Type
export type SearchItem = {
  id: number | string;
  title?: string;        // Movie, Manga-д
  name?: string;         // TV Series, Anime-д
  poster_path?: string | null; // TMDB-д
  images?: any;          // Jikan (Anime/Manga)-д
  release_date?: string;
  first_air_date?: string;
  media_type?: "movie" | "tv" | "anime" | "manga"; // Төрлийг ялгахын тулд
};

type Props = {
  keyword: string;
  results: SearchItem[];
  onClose: () => void;
};

export const SearchResult = ({ keyword, results, onClose }: Props) => {
  if (!keyword) return null;

  return (
    <div className="absolute left-0 z-50 sm:w-96 w-80 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl p-3 space-y-1 mt-2 max-h-[450px] overflow-y-auto">
      {results.length > 0 ? (
        <>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 py-1">Search Results</p>
          
          {results.slice(0, 8).map((item) => {
            // 1. Нэр тодорхойлох (Кино бол title, бусад нь name)
            const displayTitle = item.title || item.name;
            
            // 2. Огноо тодорхойлох
            const displayDate = (item.release_date || item.first_air_date)?.split("-")[0];

            // 3. Зургийн URL шийдэх (TMDB vs Jikan/Consumet)
            let imageUrl = "/no-image.png";
            if (item.poster_path) {
              imageUrl = `https://image.tmdb.org/t/p/w92${item.poster_path}`;
            } else if (item.images?.jpg?.image_url) {
              imageUrl = item.images.jpg.image_url;
            }

            // 4. Төрлөөс хамаарч очих замыг (Link) шийдэх
            let href = `/movie/${item.id}`;
            if (item.media_type === "tv") href = `/watch/tv/${item.id}`;
            if (item.media_type === "anime") href = `/watch/anime/${item.id}`;
            if (item.media_type === "manga") href = `/manga/${item.id}`;

            return (
              <Link 
                key={`${item.media_type}-${item.id}`} 
                href={href} 
                onClick={onClose} 
                className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-all group"
              >
                {/* Image Section */}
                <div className="relative w-12 h-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800">
                  <Image
                    src={imageUrl}
                    alt={displayTitle || "poster"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Info Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm line-clamp-1 dark:text-gray-100">
                      {displayTitle}
                    </p>
                    {/* Төрлийг харуулах жижиг Badge */}
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                      item.media_type === 'movie' ? 'bg-blue-500/10 text-blue-500' :
                      item.media_type === 'tv' ? 'bg-yellow-500/10 text-yellow-500' :
                      item.media_type === 'anime' ? 'bg-cyan-500/10 text-cyan-500' :
                      'bg-green-500/10 text-green-500'
                    }`}>
                      {item.media_type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{displayDate || "N/A"}</p>
                </div>

                <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0">
                   <span className="text-lg">→</span>
                </Button>
              </Link>
            );
          })}

          <Link 
            href={`/results?query=${keyword}`} 
            onClick={onClose} 
            className="block text-center text-xs font-bold text-indigo-500 hover:text-indigo-400 py-3 border-t border-gray-100 dark:border-gray-800 transition-colors"
          >
            Бүх илэрцийг үзэх "{keyword}"
          </Link>
        </>
      ) : (
        <div className="py-10 text-center">
          <p className="text-sm text-gray-500">Илэрц олдсонгүй: "{keyword}"</p>
        </div>
      )}
    </div>
  );
};