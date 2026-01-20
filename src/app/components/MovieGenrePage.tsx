// "use client"
// import { Link } from "lucide-react";
// import { useState } from "react";
// type Props = {
//   params: Promise<{ id: string }>;
// };
// type Genre = {
//   id: number;
//   name: string;
// };

// export const MovieGenre: any({ params }: Props) {
//   const { id } = await params;

//   const res = await fetch(
//     `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=en-US`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
//       },
//     }
//   );
//   const data = await res.json();
//   const movies = data.results;
//     const [genres, setGenres] = useState<Genre[]>([]);
//   return (
//     <div className="p-10">
//        <div className="flex flex-wrap gap-3">
//               {genres.map((genre) => (
//                 <Link
//                   key={genre.id}
//                 href={`/genre/${genre.id}`}
//                   className="px-4 py-1.5 text-sm border rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
//                 >
//                   {genre.name}
//                 </Link>
//               ))}
//             </div>
//     </div>
//   );
// }


import { MovieCard } from "@/app/components/MovieCard";
import Link from "next/link"; // lucide-react биш next/link ашиглана

type Props = {
  params: Promise<{ id: string }>;
};

// Төрлүүдийн жагсаалтыг авах (Дээд талын цэсэнд харуулахын тулд)
async function getGenres() {
  const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", {
    headers: { Authorization: `Bearer ${process.env.NEXT_API_TOKEN}` },
  });
  const data = await res.json();
  return data.genres;
}

// Тухайн ID-аар кинонуудыг татах
async function getMoviesByGenre(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=mn-MN`, // хэлээ тохируулж болно
    {
      headers: { Authorization: `Bearer ${process.env.NEXT_API_TOKEN}` },
      next: { revalidate: 3600 } // 1 цаг кэшлэнэ
    }
  );
  const data = await res.json();
  return data.results;
}

export default async function MovieGenrePage({ params }: Props) {
  // 1. Параметрийг await хийнэ
  const { id } = await params;

  // 2. Өгөгдлүүдээ зэрэг татаж авна
  const [genres, movies] = await Promise.all([
    getGenres(),
    getMoviesByGenre(id)
  ]);

  return (
    <div className="p-10">
      <div className="flex flex-wrap gap-3 mb-10">
        {genres.map((genre: any) => (
          <Link
            key={genre.id}
            href={`/genre/${genre.id}`}
            className={`px-4 py-1.5 text-sm border rounded-full transition ${
              id === String(genre.id) 
              ? "bg-black text-white border-black" 
              : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}