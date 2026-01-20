import Image from "next/image";
import Link from "next/link";
import Same from "@/app/components/Same"
import { Button } from "@/components/ui/button";
import { log } from "console";
import MovieCrew from "@/app/components/MovieCrew";
import { IdCard } from "lucide-react";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import {TrailerModal} from "@/app/components/Trailer";
import TrailerSection from "@/app/components/TrailerSection";

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
  runtime: number;
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

const formatTime = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
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

  export default async function MoviePage({ params }: Props) {
  const { id } = await params
  const movie = await fetchMovieById(id);

  return (
    <div className="px-20 py-10 flex flex-col ">
      <h1 className="text-3xl font-bold mb-5">{movie.title}</h1>
      <p className="mt-2 font-semibold">{movie.release_date}</p>
      <p className="mt-2 font-semibold">{movie.runtime}</p>
      <span className="bg-gray-200 px-2 py-1 rounded text-xs">{formatTime(movie.runtime)}</span>
     <TrailerSection movieId={movie.id} title={movie.title} />
      <div className="flex flex-col justify-around">  
        <p className="text-3 font-500 h-4 text-black">Rating</p>
         <div className="flex">
            {/* <img src="Starstar.png" alt="Starstar" className="w-7 h-12" /> */}
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
    {movie.genres.map((genre: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
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
     <div className="flex justify-between">
       <h3 className="font-semibold text-xl md:text-2xl text-black lg:px-10 md:px-12 pb-5">
        More like this
      </h3>
    <Link href={`/category/same/${id}`}>
     <Button className="bg-amber-300 w-20 h-auto">See more</Button>
   </Link>
     </div>
   <Same movieId={id} />
    </div>
  );
};

