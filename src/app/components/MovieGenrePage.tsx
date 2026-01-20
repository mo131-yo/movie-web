"use client";

import { MovieCard } from "@/app/components/MovieCard";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type Genre = {
  id: number;
  name: string;
};

export default function MovieGenrePage() {
  const router = useRouter();
  const params = useParams();
  
  // params.id нь "28,12" эсвэл "28%7C12" (URL encoded |) байж болно
  const idFromUrl = params?.id ? decodeURIComponent(params.id as string) : "all";

  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Бүх төрлийг татах
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
          },
        });
        const data = await res.json();
        setGenres(data.genres || []);
      } catch (e) { console.error(e); }
    };
    fetchGenres();
  }, []);

  // 2. Кинонуудыг татах
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        // Хэрэв олон сонголттой бол таслалыг | болгож солино (Ингэснээр илүү олон кино гарна)
        // Хэрэв та заавал хоёуланг нь агуулсан кино харах бол .replace-ийг устгаж болно
        const queryId = idFromUrl === "all" ? "" : idFromUrl.replace(/,/g, "|");
        
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/movie?with_genres=${queryId}&language=mn-MN&sort_by=popularity.desc`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            },
          }
        );
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Fetch movies error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [idFromUrl]); // idFromUrl өөрчлөгдөх бүрт ажиллана

  const handleToggleGenre = (genreId: number) => {
    // URL-аас одоогийн ID-нуудыг массив болгож авах
    let selectedIds = idFromUrl !== "all" 
      ? idFromUrl.split(/[|,]/) // Таслал эсвэл | байгаа эсэхийг шалгаж салгана
      : [];

    const genreIdStr = String(genreId);
    
    if (selectedIds.includes(genreIdStr)) {
      selectedIds = selectedIds.filter((id) => id !== genreIdStr);
    } else {
      selectedIds = [...selectedIds, genreIdStr];
    }

    if (selectedIds.length > 0) {
      // URL руу дамжуулахдаа таслалаар холбоно
      router.push(`/genre/${selectedIds.join(",")}`);
    } else {
      router.push(`/genre/all`);
    }
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-wrap gap-3 mb-10">
        {genres.map((genre) => {
          // Идэвхтэй байгааг шалгах
          const isSelected = idFromUrl !== "all" && idFromUrl.split(/[|,]/).includes(String(genre.id));
          
          return (
            <button
              key={genre.id}
              onClick={() => handleToggleGenre(genre.id)}
              className={`px-4 py-1.5 text-sm border rounded-full transition-all duration-300 ${
                isSelected
                  ? "bg-black text-white border-black shadow-md scale-105"
                  : "bg-white text-gray-700 border-gray-200 hover:border-black"
              }`}
            >
              {genre.name}
            </button>
          );
        })}
        
        {idFromUrl !== "all" && (
          <button 
            onClick={() => router.push("/genre/all")}
            className="text-sm text-red-500 font-medium hover:underline px-2"
          >
            Reset
          </button>
        )}
      </div>

      <hr className="mb-10 opacity-10" />
    </div>
  );
}