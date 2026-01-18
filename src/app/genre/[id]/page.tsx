// import Image from "next/image";
// import Link from "next/link";

// type Movie = {
//   id: number;
//   title: string;
//   poster_path: string;
// };

// type Props = {
//   params: { id: string };
// };

// const fetchMoviesByGenre = async (genreId: string) => {
//   const res = await fetch(
//     `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
//       },
//       next: { revalidate: 60 }, // cache
//     }
//   );

//   if (!res.ok) throw new Error("Failed to fetch movies");
//   return res.json();
// };

// export default async function GenrePage({ params }: Props) {
//   const data = await fetchMoviesByGenre(params.id);
//   const movies: Movie[] = data.results ?? [];

//   return (
//     <div className="px-10 py-8">
//       <h1 className="text-2xl font-bold mb-6">Genre Movies</h1>

//       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
//         {movies.map((movie) => (
//           <Link key={movie.id} href={`/movie/${movie.id}`}>
//             <div>
//               <Image
//                 src={
//                   movie.poster_path
//                     ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
//                     : "/no-image.png"
//                 }
//                 alt={movie.title}
//                 width={200}
//                 height={300}
//                 className="rounded-lg"
//               />
//               <p className="text-sm mt-2 font-semibold">{movie.title}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }
