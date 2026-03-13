"use client";
import { useEffect, useState } from 'react';
import { TVCard } from './TVCard';
import axios from 'axios';

interface TVSeries {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
}

export default function TVSeriesSection() {
  const [series, setSeries] = useState<TVSeries[]>([]);
  
  const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";

useEffect(() => {
  const getTVData = async () => {
    console.log("Түлхүүр шалгах:", TMDB_API_KEY);

    if (!TMDB_API_KEY) {
      console.error("TMDB_API_KEY тодорхойлогдоогүй байна!");
      return;
    }

    try {
      const response = await axios.get(
        `${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      setSeries(response.data.results);
    } catch (error: any) {
      console.error("Алдааны мэдээлэл:", error.response?.data);
      console.error("TV Series татахад алдаа гарлаа:", error);
    }
  };

  getTVData();
}, [TMDB_API_KEY]);

  if (series.length === 0) return null;

  return (
    <div className="w-full">
      <style>
        {`@keyframes aitf {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .animated-text-title-dark-tv {
          background: url(https://thumbcdn.123freevectors.com/wp-content/resized/150964-abstract-light-blue-diagonal-shiny-lines-background-design-template.webp) repeat-x;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: aitf 10s linear infinite;
        }
        .animated-text-title-tv {
          background: url(https://thumbcdn.123freevectors.com/wp-content/resized/150965-light-blue-diagonal-shiny-lines-background.webp) repeat-x;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: aitf 10s linear infinite;
        }
        `}
      </style>

      <div className="px-4 sm:px-8 lg:px-20 py-6 flex items-center justify-between">
        <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl text-black dark:text-white pb-10 animated-text-title-tv dark:animated-text-title-dark-tv uppercase tracking-tighter">
          Popular TV Series
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-8 px-4 sm:px-8 lg:px-20 mb-10">
        {series.slice(0, 10).map((item) => (
          // Одоо TypeScript 'item' дотор 'id' байгааг мэднэ
          <TVCard key={item.id} series={item} />
        ))}
      </div>
    </div>
  );
}