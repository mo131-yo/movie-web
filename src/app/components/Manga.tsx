// src/components/MangaSection.tsx
"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { searchManga } from '@/lib/service/manga';

export default function Manga() {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const getTopManga = async () => {
      const data = await searchManga("one piece"); // Жишээ хайлт
      setMangas(data);
    };
    getTopManga();
  }, []);

  return (
    <div className="mt-12 px-4">
      <h2 className="text-2xl font-bold text-white mb-6">
        Latest <span className="text-orange-500">Manga</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {mangas.map((manga: any) => (
          <Link href={`/manga/${manga.mal_id}`} key={manga.mal_id} className="group">
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-gray-800 transition-all group-hover:border-orange-500">
              <img src={manga.images.jpg.large_image_url} alt={manga.title} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-gray-300 text-sm mt-3 font-medium truncate group-hover:text-white">
              {manga.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}