import Image from "next/image";
import Link from "next/link";
import Same from "@/app/components/Same"
import { Button } from "@/components/ui/button";
import { log } from "console";

export  type Movie={
  id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    backdrop_path:string;
    overview: string;
    release_date: number
}
type Params ={
  params: Promise<{
    id: string;
  }>;
}

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

 const MovieId = async ({ params }: { params: { id: string } }) => {
  const { id } = await params
  const movie = await fetchMovieById(id);
  // const imagePath = "https://api.themoviedb.org/t/p/original"
  return (
    <div className="px-20 py-10 flex flex-col ">
      <h1 className="text-3xl font-bold mb-5">{movie.title}</h1>
      <div className="flex justify-around">
          <p className="mt-2 font-semibold">{movie.release_date}</p>
         <div>
        {/* <p className="mt-2 font-semibold">⭐ {movie.vote_average.toFixed(1)}</p> */}
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
      <p className="mt-5 text-gray-700">{movie.overview}</p>
    <Link href={`/category/same/${id}`}>
     <Button className="bg-amber-300 w-20 h-auto">Dar</Button>
   </Link>
   <Same movieId={id} />
    </div>
  );
};

export default MovieId;
