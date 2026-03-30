"use client";

import { useSearchParams } from "next/navigation";
import { FaChevronLeft, FaServer, FaClosedCaptioning } from "react-icons/fa";
import { useState, use } from "react";
import Link from "next/link";

export default function AnimeWatchPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  // 1. Params-ийг задлах (Аниме-д зөвхөн ID ирнэ)
  const params = use(paramsPromise);
  const searchParams = useSearchParams();
  
  const id = params.id;
  const season = searchParams.get("s") || "1";
  const episode = searchParams.get("e") || "1";

  // 2. Сервер болон Субтитр төлөв
  const [activeHost, setActiveHost] = useState("https://vidsrc.to");
  const [selectedSub, setSelectedSub] = useState("");

  const subFiles = [
    { name: "Chainsaw Man (MN)", path: "/subtitles/chainsaw.movie.vtt" }, 
    { name: "Spirited Away (MN)", path: "/subtitles/sprited-away.vtt" },
    { name: "Spider-Man 2 (MN)", path: "/subtitles/spiderman2.animat.vtt" }, 
  ];

  // 3. Vidsrc-д зориулсан URL бэлдэх функц
  const getEmbedUrl = () => {
    // Домэйн хаягаа энд тодорхойлно (Localhost эсвэл чиний вэбсайт)
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    
    let url = `${activeHost}/embed/tv/${id}/${season}/${episode}`;
    
    // Хэрэв субтитр сонгосон бол URL-д нэмж өгнө
    if (selectedSub) {
      const fullSubUrl = `${baseUrl}${selectedSub}`;
      const encodedSub = encodeURIComponent(fullSubUrl);
      // vidsrc.to стандарт: sub.title=Нэр&sub.url=Линк
      url += `?sub.title=Mongolian&sub.url=${encodedSub}`;
    }
    
    return url;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header - Аниме-д зориулсан мэдээлэлтэй */}
      <div className="p-4 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <Link href={`/movie/${id}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <FaChevronLeft /> Буцах
        </Link>
        <div className="text-center">
          <h1 className="text-xs font-black text-blue-500 uppercase tracking-[0.2em]">ANIME MODE</h1>
          <p className="text-[11px] text-gray-400 font-mono mt-0.5">
            SEASON <span className="text-white">{season}</span> • EPISODE <span className="text-white">{episode}</span>
          </p>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 px-4 pb-20">
        {/* Main Player */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
          <iframe
            key={selectedSub + activeHost} // Субтитр солигдоход iframe-ийг refresh хийнэ
            src={getEmbedUrl()}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
            allow="autoplay; encrypted-media"
          />
        </div>

        {/* Controls Container */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
          
          {/* Subtitle Selector */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2 tracking-widest">
              <FaClosedCaptioning className="text-blue-500" /> Subtitles
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {subFiles.map((sub) => (
                <button
                  key={sub.path}
                  onClick={() => setSelectedSub(sub.path)}
                  className={`text-left px-4 py-3 rounded-xl text-xs transition-all border ${
                    selectedSub === sub.path 
                    ? "bg-blue-600/20 border-blue-500 text-blue-400" 
                    : "bg-black/40 border-white/5 text-gray-400 hover:border-white/20"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
              <button
                onClick={() => setSelectedSub("")}
                className={`text-left px-4 py-3 rounded-xl text-xs transition-all border ${
                  selectedSub === "" 
                  ? "bg-white/10 border-white/20 text-white" 
                  : "bg-black/40 border-white/5 text-gray-400"
                }`}
              >
                No Subtitle (Default)
              </button>
            </div>
          </div>

          {/* Server Switcher */}
          <div className="space-y-4 md:border-l md:border-white/10 md:pl-6">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2 tracking-widest">
              <FaServer className="text-blue-500" /> Server Source
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {[
                { name: "Vidsrc.to", host: "https://vidsrc.to" },
                { name: "Vidsrc.me", host: "https://vidsrc.me" },
                { name: "Embed.su", host: "https://embed.su" }
              ].map((server) => (
                <button
                  key={server.host}
                  onClick={() => setActiveHost(server.host)}
                  className={`text-left px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                    activeHost === server.host 
                    ? "bg-white text-black border-white" 
                    : "bg-black/40 border-white/5 text-gray-400 hover:border-white/20"
                  }`}
                >
                  {server.name}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}