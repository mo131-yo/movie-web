"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Badge } from "../ui/Badge";
import { SlArrowDown } from "react-icons/sl";

type Genre = {
  id: number;
  name: string;
};

type MediaType = "movie" | "tv" | "anime";

export default function GenrePage() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<MediaType>("movie");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const params = useParams();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchGenres = async (type: MediaType) => {
    setLoading(true);
    try {
      const endpoint = type === "movie" ? "movie" : "tv";
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/genre/${endpoint}/list?api_key=${apiKey}&language=en-US`;

      const res = await fetch(url);
      
      if (!res.ok) {
        setGenres([]);
        return;
      }

      const data = await res.json();
      if (data.genres && Array.isArray(data.genres)) {
        setGenres(data.genres);
      } else {
        setGenres([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setGenres([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres(activeTab);
  }, [activeTab]);

  const handleGenreClick = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const applyFilter = () => {
    const genreIds = selectedGenres.join(",");
    if (selectedGenres.length === 0) {
      router.push(`/${activeTab}`);
    } else {
      const path = activeTab === "anime" ? "/anime/genre" : `/genre/${activeTab}`;
      router.push(`${path}/${genreIds}`);
    }
    setOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <Badge 
        onClick={() => setOpen(!open)} 
        className="cursor-pointer shadow text-sm font-medium px-4 py-2 rounded-lg flex gap-2 items-center hover:bg-gray-50 dark:bg-gray-800 btn-13"
      >
        <SlArrowDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
        Шүүлтүүр (Genre)
      </Badge>

      {open && (
        <div className="absolute top-12 left-0 w-[320px] sm:w-[450px] bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-5 z-50">
          
          {/* Төрөл сонгох */}
          <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl mb-4">
            {(["movie", "tv", "anime"] as MediaType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                    setActiveTab(type);
                    setSelectedGenres([]); 
                }}
                className={`flex-1 py-1.5 text-xs font-bold uppercase rounded-lg transition-all ${
                  activeTab === type 
                    ? "bg-white dark:bg-gray-800 shadow-sm text-blue-600" 
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <h3 className="text-sm font-bold mb-3 dark:text-gray-100 uppercase tracking-tight">
            {activeTab} Жанр сонгох
          </h3>
          
          <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar min-h-[100px] items-center justify-center">
            {loading ? (
              <div className="flex flex-col items-center gap-2">
                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                 <span className="text-xs text-gray-500 italic">Ачаалж байна...</span>
              </div>
            ) : genres.length > 0 ? (
              genres.map((genre) => {
                const isSelected = selectedGenres.includes(genre.id);
                return (
                  <button
                    key={genre.id}
                    onClick={() => handleGenreClick(genre.id)}
                    className={`px-4 py-2 text-[12px] font-semibold rounded-full border transition-all ${
                      isSelected
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:border-blue-500"
                    }`}
                  >
                    {genre.name}
                  </button>
                );
              })
            ) : (
              <div className="text-gray-400 text-xs italic py-4">Жанр олдсонгүй.</div>
            )}
          </div>
          
          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <button 
              onClick={() => setSelectedGenres([])}
              className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors"
            >
              Цэвэрлэх
            </button>
            <button 
              onClick={applyFilter} 
              className="px-5 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
            >
              Шүүж үзэх
            </button>
          </div>
        </div>
      )}
    </div>
  );
}