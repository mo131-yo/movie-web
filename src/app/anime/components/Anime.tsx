"use client";

import Image from "next/image";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

type Anime = {
  mal_id: number;
  title: string;
  images: { jpg: { large_image_url: string } };
  score: number;
  synopsis: string;
  trailer: { youtube_id: string };
};

export const AnimePic = ({ anime }: { anime: Anime }) => {
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <div className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-black">
      {/* 1. АРД ТАЛЫН БҮДГЭРҮҮЛСЭН ДЭВСГЭР (Энэ нь "муухай zoom"-ийг гоё харагдуулна) */}
      <div className="absolute inset-0">
        <Image
          src={anime.images.jpg.large_image_url}
          alt="blur background"
          fill
          className="object-cover blur-2xl opacity-40 scale-110" // Зургийг бүдгэрүүлж, бүх талбайг дүүргэнэ
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60" />
      </div>

      {/* 2. ТӨВ ХЭСЭГТ БАЙГАА ЖИНХЭНЭ ПОСТЕР */}
      <div className="relative h-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-start gap-10 px-8">
        
        {/* Постер зураг - Zoom-дэхгүй, харин гоё aspect ratio-той */}
        <div className="relative w-[220px] h-[320px] md:w-[350px] md:h-[500px] flex-shrink-0 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-lg overflow-hidden border border-white/10 group">
          <Image
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Текст мэдээлэл */}
        <div className="flex flex-col text-white max-w-2xl z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-cyan-500 text-black text-[10px] px-2 py-1 rounded font-black uppercase">Trending</span>
            <span className="text-yellow-400 font-bold flex items-center gap-1">
              ⭐ {anime.score} <span className="text-white/40 font-normal text-xs ml-1">MAL Score</span>
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter leading-none uppercase italic">
            {anime.title}
          </h1>

          <p className="text-sm md:text-lg text-gray-300 line-clamp-3 md:line-clamp-4 font-light leading-relaxed mb-8 max-w-xl">
            {anime.synopsis}
          </p>

          <div className="flex gap-4">
            <button 
              onClick={() => setShowTrailer(true)}
              className="bg-white text-black px-8 py-4 rounded-full font-black uppercase text-sm hover:bg-cyan-400 transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
            >
              Watch Trailer
            </button>
          </div>
        </div>
      </div>

      {/* 3. TRAILER MODAL */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <button onClick={() => setShowTrailer(false)} className="absolute top-10 right-10 text-white text-5xl hover:text-cyan-400 transition-colors">
            <IoClose />
          </button>
          <iframe
            src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}?autoplay=1`}
            className="w-full max-w-5xl aspect-video rounded-2xl border border-white/10 shadow-2xl"
            allowFullScreen
            allow="autoplay"
          />
        </div>
      )}

      {/* Доод талын "Fade to black" - Дараагийн хэсэгтэй уусгах */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};