"use client";

import { useSearchParams, useParams } from "next/navigation";
import { useState, use } from "react";
import Link from "next/link";
import { FaChevronLeft, FaServer, FaClosedCaptioning } from "react-icons/fa";

export default function TVWatchPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = use(paramsPromise);
  const searchParams = useSearchParams();
  
  const id = params.id;
  const season = searchParams.get("s") || "1";
  const episode = searchParams.get("e") || "1";

  const [activeHost, setActiveHost] = useState("https://vidsrc.to");

  const getEmbedUrl = () => {
    // TV цувралд зориулсан vidsrc url бүтэц: /embed/tv/{id}/{s}/{e}
    return `${activeHost}/embed/tv/${id}/${season}/${episode}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        <button onClick={() => window.history.back()} className="flex items-center gap-2 text-gray-400 hover:text-white">
          <FaChevronLeft /> Буцах
        </button>
        <div className="text-center">
          <h1 className="text-xs font-black text-yellow-500 uppercase tracking-widest">TV SERIES MODE</h1>
          <p className="text-[11px] text-gray-400 font-mono">SEASON {season} • EPISODE {episode}</p>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 px-4 pb-20">
        {/* Player */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/5 shadow-2xl">
          <iframe
            src={getEmbedUrl()}
            className="absolute inset-0 w-full h-full"
            allowFullScreen
          />
        </div>

        {/* Server Switcher */}
        <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-2 tracking-widest mb-4">
            <FaServer className="text-yellow-500" /> Сэрвэр сонгох
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {["https://vidsrc.to", "https://vidsrc.me", "https://embed.su"].map((host) => (
              <button
                key={host}
                onClick={() => setActiveHost(host)}
                className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border ${
                  activeHost === host ? "bg-yellow-500 text-black border-yellow-500" : "bg-black/40 border-white/5 text-gray-400"
                }`}
              >
                {host.replace("https://", "")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}