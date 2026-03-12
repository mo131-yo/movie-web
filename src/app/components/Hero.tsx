"use client";
import { useState, useEffect } from "react";
import { fetchTopAnime } from "@/lib/service/anime";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";

export default function Hero() {
  const [featuredAnime, setFeaturedAnime] = useState<any>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchTopAnime();
      setFeaturedAnime(data[0]);
    };
    getData();
  }, []);

  if (!featuredAnime) return <div className="h-[400px] bg-gray-900 animate-pulse rounded-3xl" />;

  const isTV = featuredAnime.type === "TV";

  return (
    <div className="relative h-[400px] w-full bg-gray-800 rounded-3xl overflow-hidden flex items-end p-10 border border-white/5 shadow-2xl">
      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-white mb-6">{featuredAnime.title}</h1>
        <Link href={`/anime/${featuredAnime.mal_id}`}>
          <button className="flex items-center gap-2 px-10 py-4 bg-yellow-500 text-black rounded-full font-bold hover:bg-yellow-400">
            <FaPlay /> Watch {isTV ? "Series" : "Movie"}
          </button>
        </Link>
      </div>
    </div>
  );
}