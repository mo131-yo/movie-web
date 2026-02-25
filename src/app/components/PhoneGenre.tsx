"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Badge } from "../ui/Badge";
import { SlArrowDown } from "react-icons/sl";

type Genre = {
  id: number;
  name: string;
};

export default function Phonegenre() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const idsFromUrl = (params.id as string).split(",").map(Number);
      setSelectedGenres(idsFromUrl);
    }
  }, [params.id]);

  const getGenres = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setGenres(data.genres || []);
    } catch (error) {
      console.error("Genres fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  const handleGenreClick = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) 
        ? prev.filter((g) => g !== id) 
        : [...prev, id]
    );
  };

  const applyFilter = () => {
    if (selectedGenres.length > 0) {
      router.push(`/genre/${selectedGenres.join(",")}`);
    } else {
      router.push(`/genre`);
    }
    setOpen(false);
  };

  return (
    <div className="relative left-30 px-35 lg:px-0 py-8">
      <Badge onClick={() => setOpen(!open)} variant="outline" className="cursor-pointer relative right-30 shadow text-black text-sm font-medium px-4 py-2 mt-4 rounded-lg mb-4 flex gap-2 items-center hover:bg-gray-50 transition-colors dark:bg-gray-800 dark:text-white">
        <SlArrowDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </Badge>
      {open && (
        <div className="absolute top-24 mt-2 right-3 w-90 sm:w-110 bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 z-50 dark:bg-gray-900 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Select Genres</h3>
          
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap gap-2.5 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                {genres.map((genre) => {
                  const isSelected = selectedGenres.includes(genre.id);
                  return (
                    <button key={genre.id} onClick={() => handleGenreClick(genre.id)} className={`px-4 py-2 text-sm font-medium border rounded-full transition-all duration-200 ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600 shadow-md transform scale-105"
                          : "bg-transparent text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-500 dark:text-gray-400"
                      }`}>
                      {genre.name}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                <button onClick={() => setSelectedGenres([])} className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors">
                  Reset all
                </button>
                <div className="flex gap-2">
                   <button onClick={() => setOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button onClick={applyFilter} className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none transition-all">
                    Apply
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}