// import Link from "next/link";

// type Genre = {
//   id: number;
//   name: string;
// };

// const fetchGenres = async () => {
//   const res = await fetch(
//     "https://api.themoviedb.org/3/genre/movie/list?language=en",
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
//       },
//       next: { revalidate: 86400 },
//     }
//   );

//   if (!res.ok) throw new Error("Failed to fetch genres");
//   return res.json();
// };

// export default async function Genre() {
//   const data = await fetchGenres();
//   const genres: Genre[] = data.genres ?? [];

//   return (
//     <div className="w-full max-w-5xl bg-white rounded-xl border shadow-sm p-6">
//       <h2 className="text-2xl font-bold mb-1">Genres</h2>
//       <p className="text-gray-500 mb-6">See lists of movies by genre</p>

//       <div className="flex flex-wrap gap-3">
//         {genres.map((genre) => (
//           <Link
//             key={genre.id}
//             href={`/genre/${genre.id}`}
//             className="flex items-center gap-1 px-4 py-1.5 border rounded-full text-sm hover:bg-gray-100"
//           >
//             {genre.name}
//             <span className="text-gray-400">›</span>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
