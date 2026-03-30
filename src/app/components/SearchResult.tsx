"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type SearchItem = {
  id: number | string;
  title?: string;
  name?: string;
  poster_path?: string | null;
  images?: any;
  release_date?: string;
  first_air_date?: string;
  media_type?: "movie" | "tv" | "anime" | "manga";
  genre_ids?: number[]; // Жанраар нь anime мөн эсэхийг баталгаажуулахад хэрэгтэй
};

type Props = {
  keyword: string;
  results: SearchItem[];
  onClose: () => void;
};

export const SearchResult = ({ keyword, results, onClose }: Props) => {
  if (!keyword) return null;

  return (
    <div className="absolute left-0 z-50 sm:w-96 w-80 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl p-3 space-y-1 mt-2 max-h-[450px] overflow-y-auto custom-scrollbar">
      {results.length > 0 ? (
        <>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 py-1">
            Хайлтын илэрц ({results.length})
          </p>

          {results.slice(0, 8).map((item) => {
            const displayTitle = item.title || item.name;
            const displayDate = (item.release_date || item.first_air_date)?.split("-")[0];
            
            // 1. Anime мөн эсэхийг тодорхойлох (TMDB-д media_type нь 'tv' гэж ирдэг тул жанраар нь эсвэл дамжуулж буй төрлөөр нь шалгана)
            const isAnime = item.media_type === "anime" || (item.media_type === "tv" && item.genre_ids?.includes(16));
            
            // 2. Зургийн URL тохируулах
            let imageUrl = "https://via.placeholder.com/92x138?text=No+Image"; 
            if (item.poster_path) {
              imageUrl = `https://image.tmdb.org/t/p/w92${item.poster_path}`;
            } else if (item.images?.jpg?.image_url) {
              imageUrl = item.images.jpg.image_url;
            }

            // 3. Динамик HREF (Таны URL бүтэцтэй уялдуулав)
            let href = `/movie/${item.id}`;
            if (isAnime) {
              href = `/watch/anime/${item.id}`;
            } else if (item.media_type === "tv") {
              href = `/watch/tv/${item.id}`;
            } else if (item.media_type === "manga") {
              href = `/manga/${item.id}`;
            }

            return (
              <Link
                key={`${item.media_type}-${item.id}`}
                href={href}
                onClick={onClose}
                className="flex gap-3 items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-all group"
              >
                {/* Poster Image */}
                <div className="relative w-12 h-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={imageUrl}
                    alt={displayTitle || "poster"}
                    fill
                    sizes="48px"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    unoptimized={imageUrl.includes('placeholder')}
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm line-clamp-1 dark:text-gray-100">
                      {displayTitle}
                    </p>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${
                        isAnime ? "bg-cyan-500/10 text-cyan-500 border border-cyan-500/20" :
                        item.media_type === "movie" ? "bg-blue-500/10 text-blue-500" :
                        item.media_type === "tv" ? "bg-yellow-500/10 text-yellow-500" :
                        "bg-green-500/10 text-green-500"
                      }`}
                    >
                      {isAnime ? "ANIME" : item.media_type || "N/A"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {displayDate || "N/A"} • {isAnime ? "Series" : item.media_type}
                  </p>
                </div>

                <Button
                  size="sm"
                  variant="ghost"
                  className="opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
                >
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
          <p className="text-sm text-gray-500">"{keyword}"-д тохирох илэрц олдсонгүй</p>
        </div>
      )}
    </div>
  );
};