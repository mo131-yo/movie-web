"use client";

import { SlArrowRight } from "react-icons/sl";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type Genre = {
  id: number;
  name: string;
};

type MediaType = "movie" | "tv" | "anime";

export default function MovieGenrePage() {
  const router = useRouter();
  const params = useParams();

  const type = (params?.type as MediaType) || "movie";
  const rawId = params?.id ? decodeURIComponent(params.id as string) : "all";
  const idFromUrl = rawId.includes("NaN") || rawId === "undefined" ? "all" : rawId;

  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      try {
        const endpoint = type === "movie" ? "movie" : "tv";
        
        // ЧУХАЛ: .env дээрх API Key-г URL-д параметр болгон дамжуулна
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        const res = await fetch(
          `https://api.themoviedb.org/3/genre/${endpoint}/list?api_key=${apiKey}&language=en-US`
        );

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        setGenres(data.genres || []);
      } catch (e) {
        console.error("Жанр татахад алдаа гарлаа:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, [type]);

  const handleToggleGenre = (genreId: number) => {
    let selectedIds = (idFromUrl !== "all" && idFromUrl !== "") 
      ? idFromUrl.split(/[|,]/).filter(val => val !== "" && !isNaN(Number(val))) 
      : [];

    const genreIdStr = String(genreId);
    
    if (selectedIds.includes(genreIdStr)) {
      selectedIds = selectedIds.filter((id) => id !== genreIdStr);
    } else {
      selectedIds = [...selectedIds, genreIdStr];
    }

    if (selectedIds.length > 0) {
      const uniqueIds = Array.from(new Set(selectedIds));
      router.push(`/genre/${type}/${uniqueIds.join(",")}`);
    } else {
      router.push(`/genre/${type}/all`);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-3">
        {loading ? (
          [...Array(8)].map((_, i) => (
            <div key={i} className="h-8 w-24 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-full" />
          ))
        ) : genres.length > 0 ? (
          genres.map((genre) => {
            const isSelected = idFromUrl !== "all" && idFromUrl.split(/[|,]/).includes(String(genre.id));
            return (
              <button 
                key={genre.id} 
                onClick={() => handleToggleGenre(genre.id)} 
                className={`px-4 py-1.5 text-xs font-medium border rounded-full transition-all duration-300 flex items-center gap-2 ${
                  isSelected
                    ? "bg-black text-white border-black shadow-md scale-105 dark:bg-blue-600 dark:border-blue-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-black dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700 dark:hover:border-blue-500"
                }`}
              >
                {genre.name}
                <SlArrowRight className={`text-[10px] transition-transform ${isSelected ? "rotate-90" : ""}`} />
              </button>
            );
          })
        ) : (
          <p className="text-sm text-gray-500">Жанр олдсонгүй. API Key-гээ шалгана уу.</p>
        )}
      </div>
    </div>
  );
}