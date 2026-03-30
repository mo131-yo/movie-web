"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getSeasonEpisodes } from "@/lib/service/anime";

export default function EpisodeSelector({ animeId, seasons }: { animeId: string, seasons: any[] }) {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadEpisodes() {
      setLoading(true);
      try {
        const data = await getSeasonEpisodes(animeId, selectedSeason);
        setEpisodes(data.episodes || []);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setLoading(false);
      }
    }
    if (animeId) loadEpisodes();
  }, [selectedSeason, animeId]);

  return (
    <div className="mt-8">
      {/* Season сонгох хэсэг */}
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
        {seasons?.length > 0 ? (
          seasons
            .filter((s: any) => s.season_number > 0) // Special episodes (Season 0)-г алгасах
            .map((season: any) => (
              <button
                key={season.id}
                onClick={() => setSelectedSeason(season.season_number)}
                className={`px-6 py-2 rounded-full border transition-all whitespace-nowrap ${
                  selectedSeason === season.season_number
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/20"
                    : "border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                Season {season.season_number}
              </button>
            ))
        ) : (
          <p className="text-gray-500">Бүлэг олдсонгүй.</p>
        )}
      </div>

      {/* Ангиудын жагсаалт */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {loading ? (
          // Loading төлөв
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-900 h-32 rounded-xl"></div>
          ))
        ) : episodes.length > 0 ? (
          episodes.map((ep: any) => (
            <Link 
              key={ep.id} 
              href={`/watch/${animeId}?s=${selectedSeason}&e=${ep.episode_number}`}
              className="group"
            >
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/5 bg-gray-900">
                {ep.still_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                    alt={ep.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-700">No Image</div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white">
                  EP {ep.episode_number}
                </div>
              </div>
              <h4 className="text-sm font-medium mt-3 text-gray-300 group-hover:text-white truncate">
                {ep.name}
              </h4>
            </Link>
          ))
        ) : (
          <p className="text-gray-500 col-span-full py-10 text-center">Энэ бүлэгт анги олдсонгүй.</p>
        )}
      </div>
    </div>
  );
}