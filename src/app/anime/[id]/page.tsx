"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchAnimeInfo, searchAnime } from "@/lib/service/anime";
import axios from "axios";
import Link from "next/link";

export default function AnimeDetails() {
  const { id } = useParams(); 
  const [anime, setAnime] = useState<any>(null); // MAL-аас ирэх мэдээлэл
  const [episodes, setEpisodes] = useState<any[]>([]); // Consumet-ээс ирэх ангиуд

  useEffect(() => {
    const getAnimeData = async () => {
      // 1. MAL-аас ерөнхий мэдээлэл авах
      const { data: malRes } = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
      const malData = malRes.data;
      setAnime(malData);

      // 2. Consumet-ээс видео линктэй ангиудыг олох
      // MAL-ийн гарчгаар хайлт хийж Consumet ID-г олно
      const searchResults = await searchAnime(malData.title);
      if (searchResults && searchResults.length > 0) {
        // Хамгийн эхний илэрц нь зөв анимэ байх магадлал өндөр
        const consumetInfo = await fetchAnimeInfo(searchResults[0].id);
        setEpisodes(consumetInfo.episodes || []);
      }
    };

    if (id) getAnimeData();
  }, [id]);

  if (!anime) return <div className="p-20 text-white">Уншиж байна...</div>;

  return (
    <div className="min-h-screen bg-[#1d1d27] text-white pb-20">
      {/* Дээд хэсэг: Banner & Info */}
      <div className="relative h-[400px] w-full">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d27] to-transparent z-10" />
        <img 
          src={anime.images.jpg.large_image_url} 
          className="w-full h-full object-cover opacity-30 blur-sm"
          alt="backdrop"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-60 relative z-20">
        <div className="flex flex-col md:flex-row gap-10">
          <img 
            src={anime.images.jpg.large_image_url} 
            className="w-64 rounded-xl shadow-2xl border border-white/10"
            alt={anime.title}
          />
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{anime.title}</h1>
            <p className="text-gray-400 line-clamp-4 mb-6">{anime.synopsis}</p>
            
            {/* Ангиудын жагсаалт */}
            <h2 className="text-2xl font-bold mb-4 text-cyan-500">Episodes</h2>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
              {episodes.length > 0 ? (
                episodes.map((ep) => (
                  <Link 
                    key={ep.id} 
                    href={`/watch/anime/${ep.id}`} // Видео тоглуулах хуудас руу шилжинэ
                    className="bg-white/5 hover:bg-cyan-500 hover:text-black transition p-3 rounded-lg text-center font-bold border border-white/10"
                  >
                    {ep.number}
                  </Link>
                ))
              ) : (
                <p className="col-span-full text-gray-500 text-sm">Ангиуд олдсонгүй...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}