"use client";

import { getAnimeDetails, getSeasonEpisodes } from "@/lib/service/anime";
import Image from "next/image";
import Link from "next/link";

export default async function AnimeDetailPage({ params }: { params: { id: string } }) {
  const anime = await getAnimeDetails(params.id);
  // Жишээ нь 1-р бүлгийн ангиудыг авах
  const firstSeason = await getSeasonEpisodes(params.id, 1);

  return (
    <div className="p-10 text-white">
      <h1 className="text-4xl font-bold">{anime.name}</h1>
      
      {/* Seasons-ийг сонгох хэсэг */}
      <div className="mt-10">
        <h2 className="text-2xl mb-4 text-yellow-500">Seasons</h2>
        <div className="flex gap-4">
          {anime.seasons.map((s: any) => (
            <button key={s.id} className="px-4 py-2 bg-gray-800 rounded-lg">
              {s.name} ({s.episode_count} eps)
            </button>
          ))}
        </div>
      </div>

      {/* Ангиудын жагсаалт */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        <h2 className="text-2xl col-span-full">Episodes</h2>
        {firstSeason.episodes.map((ep: any) => (
          <div key={ep.id} className="flex gap-4 bg-gray-900 p-3 rounded-xl border border-gray-800">
            <div className="relative w-32 h-20 flex-shrink-0">
               <Image 
                 src={`https://image.tmdb.org/t/p/w300${ep.still_path}`} 
                 fill className="object-cover rounded-lg" alt=""
               />
            </div>
            <div>
              <p className="text-blue-400 font-bold text-sm">Episode {ep.episode_number}</p>
              <h4 className="font-medium text-gray-200">{ep.name}</h4>
              <p className="text-xs text-gray-500 line-clamp-1">{ep.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}