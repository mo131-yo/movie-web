"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Badge } from "../ui/Badge";
import { SlArrowDown } from "react-icons/sl";

type Genre = {
  id: number;
  name: string;
};

type MediaType = "movie" | "tv" | "anime";

export default function Phonegenre() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<MediaType>("movie");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const idsFromUrl = (params.id as string)
        .split(",")
        .map(id => Number(id))
        .filter(id => !isNaN(id)); 
      setSelectedGenres(idsFromUrl);
    } else {
      setSelectedGenres([]); 
    }
    
    if (params.type) {
        setActiveTab(params.type as MediaType);
    }
  }, [params.id, params.type]);

  const getGenres = async (type: MediaType) => {
    setLoading(true);
    try {
      // АНИМЭ логик: Anime эсвэл TV үед 'tv' endpoint-оос жанр татна
      const endpoint = (type === "anime" || type === "tv") ? "tv" : "movie";
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
      
      const res = await fetch(`https://api.themoviedb.org/3/genre/${endpoint}/list?api_key=${apiKey}&language=en-US`);
      
      const data = await res.json();
      
      // Хэрэв Anime бол Animation (16) жанрыг жагсаалтаас нууна (Учир нь энэ нь суурь шүүлтүүр)
      const finalGenres = type === "anime" 
        ? (data.genres || []).filter((g: Genre) => g.id !== 16)
        : (data.genres || []);

      setGenres(finalGenres);
    } catch (error) {
      console.error("Genres fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGenres(activeTab);
  }, [activeTab]);

  const handleGenreClick = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const applyFilter = () => {
    const validGenres = selectedGenres.filter(id => !isNaN(id) && id !== 0);
    const genreIds = validGenres.length > 0 ? validGenres.join(",") : "all";

    // URL-ийн бүтэц: /genre/anime/28,12 эсвэл /genre/movie/all
    router.push(`/genre/${activeTab}/${genreIds}`);
    setOpen(false);
  };

  return (
    <div className="relative py-4 px-4 lg:hidden">
      <Badge 
        onClick={() => setOpen(!open)} 
        variant="outline" 
        className="cursor-pointer shadow text-black text-sm font-medium px-4 py-2 rounded-lg flex gap-2 items-center hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:text-white"
      >
        <SlArrowDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
        <span className="uppercase">{activeTab} Filter</span>
      </Badge>

      {open && (
        <div className="absolute top-16 left-4 right-4 bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 z-[100] dark:bg-gray-950 dark:border-gray-800">
          
          <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl mb-4">
            {(["movie", "tv", "anime"] as MediaType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                    setActiveTab(type);
                    setSelectedGenres([]); // Төрөл солигдоход сонгосон жанруудыг цэвэрлэнэ
                }}
                className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all ${
                  activeTab === type 
                    ? "bg-white dark:bg-gray-800 shadow-sm text-blue-600" 
                    : "text-gray-500"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <h3 className="text-sm font-bold mb-3 dark:text-gray-100 uppercase">Select Genres</h3>
          
          <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar min-h-[120px]">
            {loading ? (
              <div className="w-full flex justify-center py-10">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              genres.map((genre) => {
                const isSelected = selectedGenres.includes(genre.id);
                return (
                  <button 
                    key={genre.id} 
                    onClick={() => handleGenreClick(genre.id)} 
                    className={`px-3 py-1.5 text-xs font-medium border rounded-full transition-all ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-md"
                        : "bg-transparent text-gray-600 border-gray-200 dark:border-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {genre.name}
                  </button>
                );
              })
            )}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <button 
              onClick={() => setSelectedGenres([])} 
              className="text-xs font-bold text-gray-400 hover:text-red-500"
            >
              Reset
            </button>
            <div className="flex gap-2">
              <button onClick={() => setOpen(false)} className="px-4 py-2 text-xs font-medium dark:text-gray-400">
                Cancel
              </button>
              <button onClick={applyFilter} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold shadow-lg hover:bg-blue-700">
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}