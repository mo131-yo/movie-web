import Image from "next/image";
import Link from "next/link";
import Same from "@/app/components/Same"
import { Button } from "@/components/ui/button";
import Comment from "@/app/components/Comment"
import Rating from "@/app/components/Rating";
import MovieCrew from "@/app/components/MovieCrew";

export type Movie={
  id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    backdrop_path:string;
    overview: string;
    release_date: number;
    genres: Genre[];
    vote_count: number;
  popularity: number;
}
type Params ={
  params: Promise<{
    id: string;
  }>;
}

type Props = {
  params: {
    id: string;
  };
};
type Genre = {
  id: number;
  name: string;
};

export const fetchMovieById = async (id: string) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}`,
    {
       method: "GET",
      headers: {
         "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_API_TOKEN}`,
      },
    }
  );
  return res.json();
};

//  export const MovieId = async ({ params }: { params: { id: string } }) => {
  export default async function MoviePage({ params }: Props) {
  const { id } = await params
  const movie = await fetchMovieById(id);

  return (
    <div className="px-20 py-10 flex flex-col ">
      <h1 className="text-3xl font-bold mb-5">{movie.title}</h1>
      <p className="mt-2 font-semibold">{movie.release_date}</p>
      <div className="flex flex-col justify-around">
        <p className="text-3 font-500 h-4 text-black">Rating</p>
         <div className="flex">
            <img src="Starstar.png" className="w-7 h-12" />
            <div className="flex flex-col">
              <p className="mt-2 font-semibold">{movie.vote_average.toFixed(1)} <span className="text-gray-400">/10</span></p>
              <p className="mt-2 font-semibold">{movie.vote_count}</p>
            </div>
         </div>
     </div>
<div className="flex gap-8 justify-center">
   <Image
  src={
    movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/no-image.png"
  }
  alt={`Poster of ${movie.title ?? "movie"}`}
    width={300}
  height={450}
  className="w-72.5 h-107"
/>
 <Image
  src={
    movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : "/no-image.png"
  }
  alt={`Poster of ${movie.title ?? "movie"}`}
  width={600}
  height={450}
  className="w-190 h-107"
/>
</div>
{/* GENRES */}
{movie.genres?.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-3">
    {movie.genres.map((genre) => (
      <Link
        key={genre.id}
        href={`/genre/${genre.id}`}
        className="px-3 py-1 text-sm border rounded-full hover:bg-gray-100 transition"
      >
        {genre.name}
      </Link>
    ))}
  </div>
)}
      <p className="mt-5 text-gray-700">{movie.overview}</p>
      <MovieCrew movieId={id}/>
    <Link href={`/category/same/${id}`}>
     <Button className="bg-amber-300 w-20 h-auto">See more</Button>
   </Link>
   <Same movieId={id} />
   <Comment movieId={id} />
   <Rating movieId={id}/>
    </div>
  );
};

