"use client";

import { SlArrowRight } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type Genre = {
  id: number;
  name: string;
};

export default function MovieGenrePage() {
  const router = useRouter();
const params = useParams();
// params.id-г аваад, хэрэв NaN гэсэн стринг байвал түүнийг "all" эсвэл хоосон болгоно
const rawId = params?.id ? decodeURIComponent(params.id as string) : "all";
const idFromUrl = rawId.includes("NaN") ? "all" : rawId
  
  // const idFromUrl = params?.id ? decodeURIComponent(params.id as string) : "all";

  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
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
  }, [idFromUrl]); 

//   const handleToggleGenre = (genreId: number) => {
//    let selectedIds = (idFromUrl !== "all" && idFromUrl !== "") 
//     ? idFromUrl.split(/[|,]/).filter(id => id !== "NaN" && id !== "") 
//     : [];

//     const genreIdStr = String(genreId);
    
//     if (selectedIds.includes(genreIdStr)) {
//       selectedIds = selectedIds.filter((id) => id !== genreIdStr);
//     } else {
//       selectedIds = [...selectedIds, genreIdStr];
//     }

//   if (selectedIds.length > 0) {
//     // Давхардсан ID байхгүй эсэхийг шалгаад залгах
//     const uniqueIds = Array.from(new Set(selectedIds));
//     router.push(`/genre/${uniqueIds.join(",")}`);
//   } else {
//     router.push(`/genre/all`);
//   }
// };

const handleToggleGenre = (genreId: number) => {
    // ID-нуудыг салгахдаа NaN, undefined-ыг давхар шүүх
    let selectedIds = (idFromUrl !== "all" && idFromUrl !== "") 
      ? idFromUrl.split(/[|,]/).filter(val => 
          val !== "NaN" && 
          val !== "undefined" && 
          val !== "" && 
          !isNaN(Number(val)) // Зөвхөн тоо эсэхийг шалгана
        ) 
      : [];

  const genreIdStr = String(genreId);
  
if (selectedIds.includes(genreIdStr)) {
      selectedIds = selectedIds.filter((id) => id !== genreIdStr);
    } else {
      selectedIds = [...selectedIds, genreIdStr];
    }

    if (selectedIds.length > 0) {
      const uniqueIds = Array.from(new Set(selectedIds));
      router.push(`/genre/${uniqueIds.join(",")}`);
    } else {
      router.push(`/genre/all`);
    }
  };
  return (
    <div className="p-6 lg:p-10">
      <div className="flex flex-wrap gap-3 mb-10">
        {genres.map((genre) => {
          const isSelected = idFromUrl !== "all" && idFromUrl.split(/[|,]/).includes(String(genre.id));
          return (
            <button key={genre.id} onClick={() => handleToggleGenre(genre.id)} className={`px-4 py-1.5 text-sm border rounded-full transition-all duration-300 ${
                isSelected
                  ? "bg-black text-white border-black shadow-md scale-105 dark:bg-blue-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-black"
              }`}
            >
             <div className="flex gap-1">{genre.name}
               <div className="p-1">
                <SlArrowRight />
               </div>
             </div>
            </button>
          );
        })}
        
        {idFromUrl !== "all" && (
          <button onClick={() => router.push("/genre/all")} className="text-sm text-red-500 font-medium hover:underline px-2">Reset</button>
        )}
      </div>
      <div className="mb-10 opacity-10" ></div>
    </div>
  );
}